import java.io.*;
import javax.json.*;
import javax.json.stream.*;
import java.util.*;

public class CaptureTheFlag extends Game {
	private int flagsCaptured;
	private int flagsNeeded;
	private int Seniors;
	private int rounds;
	private int EnemySeniors;
	private int EnemyFlagsCaptured;
	private int totalPossible;
	private int botPossible;
	private int EnemyStudents;
	private int totalStudents;
	private int reinforceAmount;
	private boolean attackSenior;
	private boolean defendSenior;
	private boolean botAttackSenior;
	private boolean botDefendSenior;
	private int attackingStudents;
	private int defendingStudents;
	private int botAttackingStudents;
	private int botDefendingStudents;
	private int gameWinner;
	private String playeroneprevious
	private String playertwoprevious
	public GameState initializeGame(boolean testMode) {
		// Add logic to build tracking variables and data structures
		//
		flagsCaptured = 0;
		flagsNeeded = 10;
		Seniors = 5;
		rounds = 1;
		EnemySeniors = 5;
		EnemyFlagsCaptured = 0;
		totalPossible = 150;
		botPossible = 150;
		EnemyStudents = totalPossible;
		totalStudents = botPossible;
		reinforceAmount = 10;
		gameover = false;
		gameWinner = 0;
		playeroneprevious = "";
		playertwoprevious = "";
		
		attackSenior = false;
		defendSenior =  false;
		attackingStudents = 0;
		defendingStudents = 0;
		botAttackSenior = false;
		botDefendSenior = false;
		botAttackingStudents = 0;
		botDefendingStudents = 0;
		// Choose starting player
		currentPlayer = 1;

		String inputForBot = totalStudents + ";" ;
		inputForBot += Seniors + ";";
		inputForBot += (totalPossible - totalStudents) + ";";
		inputForBot += (botPossible - EnemyStudents) + ";";
		inputForBot += flagsCaptured + ";";
		inputForBot += EnemyFlagsCaptured + ";";
		String gameState = null;

		if (testMode) {
			gameState = "prepare state information here";
		}

		ArrayList<Entity> entities = new ArrayList<Entity>();
		ArrayList<String> assets = new ArrayList<String>();

		// Build two sample entities
		for (int i = 0; i < 2; ++i) {
			Entity entity = new Entity();
			entity.id = i;
			entity.type = "text";
			entity.visible = true;
			entity.initX = i * 50;
			entity.initY = i * 40;
			entity.width = 40;
			entity.height = 40;
			entity.flipped = false;
			entity.rotation = 0.0;
			entity.args = new ArrayList<String>();
			entity.args.add("font:Times New Roman");
			entity.args.add("wordWrap:true");
			entity.args.add("strokeThickness:2em");
			entity.args.add("tabs:3");
			entity.args.add("fontSize:2");
			entities.add(entity);
		}
		
		// Map 3 asset names to their url paths
		assets.add("asset1:" + assetBasePath + "SampleGame/asset1.png");
		assets.add("asset2:" + assetBasePath + "SampleGame/asset2.png");
		assets.add("asset3:" + assetBasePath + "SampleGame/asset3.png");

		// Uncomment to print JSON object prior to being returned
		// JsonObject result = initializeJson("url/sample.jpg", 1.0, 1, entities).build();
		//System.out.println("Sample initial state JSON object:\n\n");
		//System.out.println(result.toString());

		return new GameState(inputForBot, gameState, initializeJson(
			assetBasePath + "SampleGame/background.png", 1.0, 1, entities, assets));
	}

	public int getCurrentPlayer() {
		// Add logic to determine current player or simple return current player
		return currentPlayer;

	}

	public String isMoveValid(String move) {
		// Evaluate that move is legal
		String error = null;		
		if (getCurrentPlayer() == 1){
		attackSenior = false;
		defendSenior =  false;
		attackingStudents = 0;
		defendingStudents = 0;
		String parts = move;
			if (parts[0].equals("free")){
				//This is here in case we change the freedom rules
				if (totalStudents >= totalPossible){
					totalStudents = totalPossible;
				}
				else {
					totalStudents += (totalPossible - totalStudents)/2 ;
				}
			}   
			else if (parts.length >= 4){
				if (parts[0].equals("attack")){
					if (parts[1].equals("senior")){
						if (Seniors == 0){
							error = "Player 1: Illegal move: Not enough Seniors. ";
						}
						else {
							Seniors--;
							attackSenior = true;
						}
					}
					else if (parts[1].equals("reinforce")){
						totalStudents += reinforceAmount;
						totalPossible += reinforceAmount;
					}
					else {
						try {
							int students = Integer.parseInt(parts[1]);
							if (students > totalStudents){
								error = "Player 1: Illegal move: Not enough Students. ";
							}
							if (students <= 0) {
								attackingStudents = 0;
							}
							else
							{
								attackingStudents = students;
							}
							}
						catch (NumberFormatException e){
							error = "Player 1: Illegal move: Not given a number, reinforce, or senior command. ";
						}
					}
				}
				if (parts[2].equals("defend")){
					if (parts[3].equals("senior")){
						if (Seniors == 0){
							error = "Player 1: Illegal move: Not enough Seniors. ";
						}
						else {
							Seniors--;
							defendSenior = true;
						}
					}
					else if (parts[3].equals("reinforce")){
						totalStudents += reinforceAmount;
						totalPossible += reinforceAmount;
					}
					else {
						try {
							int students = Integer.parseInt(parts[3]);
							if (students > totalStudents){
								error = "Player 1: Illegal move: Not enough Students. ";
							}
							if ((students + attackingStudents) > totalStudents){
								error = "Player 1: Illegal move: Attacking and defending students exceeds max limit. ";
							}
							if (students <= 0){
								defendingStudents = 0;
							}
							else
							{
								defendingStudents = students;
							}
						}
						catch (NumberFormatException e){
							error = "Player 1: Illegal move: Not given a number, reinforce, or senior command. ";
						}
					}
				}
			}
		}
		else if (getCurrentPlayer() == 2){
			botAttackSenior = false;
			botDefendSenior = false;
			botAttackingStudents = 0;
			botDefendingStudents = 0;
			String botmove = move;
			if (botmove[0].equals("free")){
            //This is here in case we change the freedom rules
				if (EnemyStudents >= botPossible){
					EnemyStudents = botPossible;
				}
				else {
					EnemyStudents += (botPossible - EnemyStudents)/2 ;
				}
			}   
			if (botmove.length >= 4){
				if (botmove[0].equals("attack")){
					if (botmove[1].equals("senior")){
						if (EnemySeniors == 0){
							error = "Player 2: Illegal move: Not enough Seniors. ";
						}
						else {
							EnemySeniors--;
							botAttackSenior = true;
						}
					}
					else if (botmove[1].equals("reinforce")){
						EnemyStudents += reinforceAmount;
						botPossible += reinforceAmount;
					}
					else {
						try {
							int students = Integer.parseInt(botmove[1]);
							if (students > EnemyStudents){
								error = "Player 2: Illegal move: Not enough Students. ";
							}
							if (students <= 0) {
								botAttackingStudents = 0;
							} 
							else
							{
								botAttackingStudents = students;
							}
						}
						catch (NumberFormatException e){
							error = "Player 2: Illegal move: Not given a number, reinforce, or senior command. ";
						}
					}
				}
				if (botmove[2].equals("defend")){
					if (botmove[3].equals("senior")){
						if (EnemySeniors == 0){
							error = "Player 2: Illegal move: Not enough Seniors. ";
						}
						else {
							EnemySeniors--;
							botDefendSenior = true;
						}
					}
					else if (botmove[3].equals("reinforce")){
						EnemyStudents += reinforceAmount;
						botPossible += reinforceAmount;
					}
					else {
						try {
							int students = Integer.parseInt(botmove[3]);
							if (students > EnemyStudents){
								error = "Player 2: Illegal move: Not enough Students. ";
							}
							if ((students + botAttackingStudents) > EnemyStudents){
								error = "Player 2: Illegal move: Attacking and defending students exceeds max limit. ";
							}
							if (students <= 0){
								botDefendingStudents = 0;
							}
							else
							{
								botDefendingStudents = students;
							}
						}
						catch (NumberFormatException e){
							error = "Player 2: Illegal move: Not given a number, reinforce, or senior command. ";
						}
					}
				}
			}
		}
		// If move is legal, error should be null,
		// else provide an error message and return it

		return error;
	}

	public GameState updateState(String move, boolean testMode) {
		// Update game state information and construct turn JSON to represent
		// changes.

		// Save copy of current player
		int pastPlayer = getCurrentPlayer();

		// Add logic to update state based on valid move
		// This is done in isValidMove mostly
		
		// determine next current player
		if (getCurrentPlayer() == 1){
			currentPlayer = 2;
			if (attackSenior && defendSenior){
				playeroneprevious += "senior:senior:";
			}
			if (attackSenior && !defendSenior){
				playeroneprevious += "senior:" + defendingStudents + ":";
			}
			if (!attackSenior && defendSenior){
				playeroneprevious += attackingStudents + ":" + "senior:";
			}
			if (!attackSenior && !defendSenior){
				playeroneprevious += attackingStudents + ":" + defendingStudents + ":";
			}
		}
		else if (getCurrentPlayer() == 2){
			currentPlayer = 1;
			rounds++;
			
			if (botAttackSenior && botDefendSenior){
				playertwoprevious += "senior:senior:";
			}
			if (botAttackSenior && !botDefendSenior){
				playertwoprevious += "senior:" + botDefendingStudents + ":";
			}
			if (!botAttackSenior && botDefendSenior){
				playertwoprevious += botAttackingStudents + ":" + "senior:";
			}
			if (!botAttackSenior && !botDefendSenior){
				playertwoprevious += botAttackingStudents + ":" + botDefendingStudents + ":";
			}
			
				//If one side sends a senior while the other does not, that side
			//will claim the round and capture all opposing students.
			boolean player1success = false;
			boolean player2success = false;
			if (botAttackSenior && !defendSenior){
				totalStudents -= defendingStudents;
				EnemyFlagsCaptured += 1;
				player2success = true;
				//followed by JSON representing capture
			}
			if (attackSenior && !botDefendSenior){
				EnemyStudents -= botDefendingStudents;
				flagsCaptured += 1;
				player1success = true;
				//followed by JSON representing capture
			}
			if (botDefendSenior && !attackSenior){
				totalStudents -= attackingStudents;
				//followed by JSON representing capture
			}
			if (defendSenior && !botAttackSenior){
				EnemyStudents -= botAttackingStudents;
				//followed by JSON representing capture
			}
			//Otherwise, the player that sent the higher number of students will
			//claim victory for the round.
			if (!botDefendSenior && !attackSenior){
				if (attackingStudents > botDefendingStudents){
					EnemyStudents -= botDefendingStudents;
					flagsCaptured += 1;
					player1success = true;
					//followed by JSON
				}
				if (attackingStudents < botDefendingStudents){
				totalStudents -= attackingStudents;
				//followed by JSON
				}
			}
			if (!botAttackSenior && !defendSenior){
				if (botAttackingStudents < defendingStudents){
					EnemyStudents -= botAttackingStudents;
					//followed by JSON
				}
				if (botAttackingStudents > defendingStudents){
					totalStudents -= defendingStudents;
					EnemyFlagsCaptured += 1;
					player2success = true;
					//followed by JSON
				}
			}
			
			if (player1success && player2success){
				playeroneprevious += "3:";
				playertwoprevious += "3:";
			}
			if (player1success && !player2success){
				playeroneprevious += "1:";
				playertwoprevious += "1:";
			}
			if (!player1success && player2success){
				playeroneprevious += "2:";
				playertwoprevious += "2:";
			}
			if (!player1success && !player2success){
				playeroneprevious += "0:";
				playertwoprevious += "0:";
			}
			
			//Game victory if statements
			if (flagsCaptured >= flagsNeeded && EnemyFlagsCaptured >= flagsNeeded && flagsCaptured == EnemyFlagsCaptured){
				//Game is currently tied, Possibly introduce JSON text to indicate tiebreaker round
			}
			else if (flagsCaptured >= flagsNeeded && flagsCaptured > EnemyFlagsCaptured){
				gameWinner = 1;
				gameover = true;
			}
			else if (EnemyFlagsCaptured >= flagsNeeded && EnemyFlagsCaptured > flagsCaptured){
				gameWinner = 2;
				gameover = true;
			}
		}
		
		if (rounds == 50 && !gameover) {
            if (flagsCaptured > EnemyFlagsCaptured){
                gameWinner = 1;
				gameover = true;
            }
            else if (flagsCaptured < EnemyFlagsCaptured){
                gameWinner = 2;
				gameover = true;
            }
            else {
                if (totalStudents > EnemyStudents){
                    gameWinner = 1;
					gameover = true;
                }
                else if (EnemyStudents > totalStudents){
                    gameWinner = 2;
					gameover = true;
                }
                else {
                    gameWinner = 1;
					gameover = true;
                }
               
            }
               
        }
		
		if (pastPlayer == 1){
		String inputForBot = EnemyStudents + ";" ;
		inputForBot += EnemySeniors + ";";
		inputForBot += (botPossible - EnemyStudents) + ";";
		inputForBot += (totalPossible - totalStudents) + ";";
		inputForBot += EnemyFlagsCaptured + ";";
		inputForBot += flagsCaptured + ";";
		inputForBot += playertwoprevious;
		String gameState = null;
		}
		if (pastPlayer == 2){
		String inputForBot = totalStudents + ";" ;
		inputForBot += Seniors + ";";
		inputForBot += (totalPossible - totalStudents) + ";";
		inputForBot += (botPossible - EnemyStudents) + ";";
		inputForBot += flagsCaptured + ";";
		inputForBot += EnemyFlagsCaptured + ";";
		inputForBot += playeroneprevious;
		String gameState = null;
		}
		if (testMode) {
			gameState = "provide all needed state information";
		}

		// Sample turn JSON
		ArrayList<Change> changes = new ArrayList<Change>();

		for (int i = 0; i < 2; ++i) {
			changes.add(new Change());
			changes.get(i).id = i + 1;
			changes.get(i).actions = new ArrayList<Action>();
			changes.get(i).actions.add(new Action());
			changes.get(i).actions.get(0).action = "move";
			changes.get(i).actions.get(0).starttime = 0.0;
			changes.get(i).actions.get(0).endtime = 1.0;
			changes.get(i).actions.get(0).args = new ArrayList<String>();
			changes.get(i).actions.get(0).args.add("x:" + (40 + i * 40));
			changes.get(i).actions.get(0).args.add("y:" + (30 + i * 30));
			changes.get(i).actions.get(0).args.add("width:200");
			changes.get(i).actions.get(0).args.add("height:200");
			changes.get(i).actions.get(0).args.add("rotation:0.0");
			changes.get(i).actions.get(0).args.add("flipped:false");
		}

		// Uncomment to view turn json prior to being returned in object
		// JsonObjectBuilder turn = buildTurnJson(1.0, changes, 1, 1);
		// System.out.println("\n\nSample turn JSON object\n\n");
		// System.out.println(turn.build().toString());

		return new GameState(inputForBot, gameState, buildTurnJson(
			1.0, changes, pastPlayer, getCurrentPlayer()));
	}

	public void loadGameState(String state, int player) {
		// This will be invoked only in test mode.
		// Pass all state information and next player here, reconstruct
		// previous game state.
	}

	public boolean isGameOver() {
		// Add logic in here for evaluating if ending condition has been met,
		// or if that logic is else where, return an existing boolean value;
		if (gameover == true) {
			return true;
		}
		return false;
	}

	public int getWinner() {
		// This will be called once isGameOver returns true, either
		// determine the winner in here or return an existing int value;
		// This should relate to the player, 1 or 2.
		if (gameWinner == 1) {
		return 1;
		}
		else if (gameWinner == 2) {
		return 2;
		}
		return 1;
	}

}
