import java.util.*;
import java.io.*;
import java.nio.file.Files;
import java.lang.reflect.*;
import javax.json.*;
import java.net.*;

public class Start {

	private static String pwd = System.getProperty("user.dir");
	private static Class<?> c;
	private static Method isGameOver,getCurrentPlayer, initializeGame, 
            isMoveValid, loadGameState, updateState, getWinner;
    private static Object gameObj;
    private static boolean bots = false;

    // Set this to true if you want to test your programs ability
    // to create game state information.
    // Logic for testing loadGameState not complete yet
    private static boolean testMode = false;
	public static void main (String [] args) {

		Process player1Process, player2Process;
		BufferedReader readerPlayer1, readerPlayer2;
		BufferedWriter writerPlayer1, writerPlayer2;

		if (args.length == 0) {
			bots = true;
		}

		try {
			File f = new File(pwd);
			URL[] cp = {f.toURI().toURL()};
			URLClassLoader urlcl = new URLClassLoader(cp);
			c = urlcl.loadClass("CaptureTheFlag");

         	isGameOver = c.getMethod("isGameOver");
            getCurrentPlayer = c.getMethod("getCurrentPlayer");
            initializeGame = c.getMethod("initializeGame", boolean.class);
            isMoveValid = c.getMethod("isMoveValid", String.class);
            loadGameState = c.getMethod("loadGameState", String.class, int.class);
            updateState = c.getMethod("updateState", String.class, boolean.class);
            getWinner = c.getMethod("getWinner");
            gameObj = c.newInstance();

            // Initialize game and store initial state.
            GameState initialState = (GameState)initializeGame.invoke(gameObj, testMode);
            GameState gameState = new GameState();
            String botInput = initialState.botInput;

            // Uncomment to write JSON to stdout
            //System.out.println(initialState.jsonBuilder.build());

            if (bots) {
            	System.out.println(botInput);
            	try {

		            String botMove = "";
		            String valid = null;

	            	// Get starting player. Expects int to be 1 or 2
		            int currentPlayer = (int)getCurrentPlayer.invoke(gameObj);		            

		            JsonArrayBuilder turnsBuilder = Json.createArrayBuilder();

            		while (!(boolean)isGameOver.invoke(gameObj)) {
						// Set bots flag to true and start bot processes
						
						ProcessBuilder p1 = new ProcessBuilder("java", "Bot");
						ProcessBuilder p2 = new ProcessBuilder("java", "Bot2");

						player1Process = p1.start();
						player2Process = p2.start();
						
						// Redirect first player input/output
						OutputStream stdinPlayer1 = player1Process.getOutputStream();
						InputStream stdoutPlayer1 = player1Process.getInputStream();
						readerPlayer1 = new BufferedReader(new InputStreamReader (stdoutPlayer1));
						writerPlayer1 = new BufferedWriter(new OutputStreamWriter (stdinPlayer1));

						// Redirect second player input/output
						OutputStream stdinPlayer2 = player2Process.getOutputStream();
						InputStream stdoutPlayer2 = player2Process.getInputStream();
						readerPlayer2 = new BufferedReader(new InputStreamReader (stdoutPlayer2));
						writerPlayer2 = new BufferedWriter(new OutputStreamWriter (stdinPlayer2));

		            	JsonObjectBuilder turnBuilder;
		            	if (currentPlayer == 1) {
		            		writerPlayer1.write(currentPlayer + "\n");
		            		writerPlayer1.write(botInput + "\n");
		            		writerPlayer1.flush();
		            		botMove = readerPlayer1.readLine();
		            	}
		            	else {
		            		writerPlayer2.write(currentPlayer + "\n");
		            		writerPlayer2.write(botInput + "\n");
		            		writerPlayer2.flush();
		            		botMove = readerPlayer2.readLine();
		            	}
		            	
		            	System.out.println(currentPlayer + ": " + botMove);

		            	valid = (String)isMoveValid.invoke(gameObj, botMove);

		            	if (valid == null) {
		            		gameState = (GameState)updateState.invoke(gameObj, botMove, testMode);
		            		turnBuilder = gameState.jsonBuilder;
		            		turnBuilder.add("stdin", gameState.botInput);
		            		turnBuilder.add("stdout", botMove);

		            		botInput = gameState.botInput;
		            		turnsBuilder.add(turnBuilder.build());
		            	}
		            	else {
		            		System.out.println(valid);
		            	}
		            	currentPlayer = (int)getCurrentPlayer.invoke(gameObj);
		            	player1Process.destroy();
		            	player2Process.destroy();
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
				// Game is over
				System.out.println("Winner: " + (int)getWinner.invoke(gameObj));
				// Uncomment to show last game state from game and turns JSON
            	// System.out.print(state);
				// System.out.println(turnsBuilder.build());
            }

            if (!bots) {

            	int currentPlayer = (int)getCurrentPlayer.invoke(gameObj);
            	Scanner sc = new Scanner(System.in);

            	String botMove = "";
	            String valid = null;

            	JsonArrayBuilder turnsBuilder = Json.createArrayBuilder();

            	while (!(boolean)isGameOver.invoke(gameObj)) {
            		JsonObjectBuilder turnBuilder;

            		System.out.println("Player " + currentPlayer);
            		System.out.println(botInput);

            		botMove = sc.nextLine();
            		System.out.println("DF " + botMove);

            		valid = (String)isMoveValid.invoke(gameObj, botMove);

            		if (valid == null) {
	            		gameState = (GameState)updateState.invoke(gameObj, botMove, testMode);
	            		turnBuilder = gameState.jsonBuilder;
	            		turnBuilder.add("stdin", gameState.botInput);
	            		turnBuilder.add("stdout", botMove);

	            		botInput = gameState.botInput;
	            		turnsBuilder.add(turnBuilder.build());
	            	}
	            	else {
	            		System.out.println(valid);
	            	}
	            	currentPlayer = (int)getCurrentPlayer.invoke(gameObj);
            	}

            }

		} catch (Exception e) {
			e.printStackTrace();
		}


	}
}