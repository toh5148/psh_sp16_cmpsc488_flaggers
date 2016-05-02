import java.io.*;
import javax.json.*;
import javax.json.stream.*;
import java.util.*;
import java.util.Random;
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
	private boolean gameover;
	private int gameWinner;
	private String playeroneprevious;
	private String playertwoprevious;
	
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
		inputForBot += rounds + ";";
		String gameState = null;

		if (testMode) {
			gameState = "prepare state information here";
		}

		ArrayList<Image> assets = new ArrayList<Image>();
		ArrayList<Entity> entities = new ArrayList<Entity>();

		Entity entity = new Entity();
		entity.id = 1;
		entity.type = "text";
		entity.visible = true;
		entity.initX =  325;
		entity.initY = 550;
		entity.width = 300;
		entity.height = 50;
		entity.flipped = false;
		entity.rotation = 0.0;
		entity.args = new ArrayList<String>();
		entity.args.add("value:Game Starting...");
		entity.args.add("font:30pt Times New Roman");
		entity.args.add("wordWrap:true");
		entity.args.add("strokeThickness:2em");
		entity.args.add("tabs:3");
		entities.add(entity);
		
		entity = new Entity();
		entity.id = 2;
		entity.type = "spriteChicken";
		entity.visible = true;
		entity.initX =  150;
		entity.initY = 100;
		entity.width = 50;
		entity.height = 50;
		entity.flipped = false;
		entity.rotation = 0.0;
		entity.args = new ArrayList<String>();
		entities.add(entity);
		
		entity = new Entity();
		entity.id = 3;
		entity.type = "spriteChicken";
		entity.visible = true;
		entity.initX =  150;
		entity.initY = 350;
		entity.width = 50;
		entity.height = 50;
		entity.flipped = false;
		entity.rotation = 0.0;
		entity.args = new ArrayList<String>();
		entities.add(entity);
		
		entity = new Entity();
		entity.id = 4;
		entity.type = "spriteRabbit";
		entity.visible = true;
		entity.initX =  650;
		entity.initY = 350;
		entity.width = 50;
		entity.height = 50;
		entity.flipped = true;
		entity.rotation = 0.0;
		entity.args = new ArrayList<String>();
		entities.add(entity);
		
		entity = new Entity();
		entity.id = 5;
		entity.type = "spriteRabbit";
		entity.visible = true;
		entity.initX =  650;
		entity.initY = 100;
		entity.width = 50;
		entity.height = 50;
		entity.flipped = true;
		entity.rotation = 0.0;
		entity.args = new ArrayList<String>();
		entities.add(entity);
		
		entity = new Entity();
		entity.id = 6;
		entity.type = "text";
		entity.visible = true;
		entity.initX =  0;
		entity.initY = 25;
		entity.width = 100;
		entity.height = 50;
		entity.flipped = false;
		entity.rotation = 0.0;
		entity.args = new ArrayList<String>();
		entity.args.add("value:Flags Captured- 0");
		entity.args.add("font:16pt Times New Roman");
		entity.args.add("wordWrap:true");
		entity.args.add("strokeThickness:2em");
		entity.args.add("tabs:3");
		entities.add(entity);
		
		entity = new Entity();
		entity.id = 7;
		entity.type = "text";
		entity.visible = true;
		entity.initX =  625;
		entity.initY = 25;
		entity.width = 100;
		entity.height = 50;
		entity.flipped = false;
		entity.rotation = 0.0;
		entity.args = new ArrayList<String>();
		entity.args.add("value:Flags Captured- 0");
		entity.args.add("font:16pt Times New Roman");
		entity.args.add("wordWrap:true");
		entity.args.add("strokeThickness:2em");
		entity.args.add("tabs:3");
		entities.add(entity);
		
		// Map 3 asset names to their url paths
		//assets.add("asset1:" + assetBasePath + "CaptureTheFlag/asset1.png");
		//assets.add("asset2:" + assetBasePath + "CaptureTheFlag/asset2.png");
		//assets.add("asset3:" + assetBasePath + "CaptureTheFlag/asset3.png");

		// Uncomment to print JSON object prior to being returned
		//JsonObject result = initializeJson("url/sample.jpg", 1.0, 1, entities).build();
		//System.out.println("Sample initial state JSON object:\n\n");
		//System.out.println(result.toString());

		return new GameState(inputForBot, gameState, initializeJson(
			assetBasePath + "CaptureTheFlag/background.png", 4.0, 1, assets, entities));
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
		if (move == null){
			error = "Player 1 did not submit a move.";
			gameover = true;
			gameWinner = 2;
			return error;
		}
		String [] parts = move.split(";");
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
							gameover = true;
							gameWinner = 2;
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
								gameover = true;
								gameWinner = 2;
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
							gameover = true;
							gameWinner = 2;
							error = "Player 1: Illegal move: Not given a number, reinforce, or senior command. ";
						}
					}
				}
				if (parts[2].equals("defend")){
					if (parts[3].equals("senior")){
						if (Seniors == 0){
							gameover = true;
							gameWinner = 2;
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
								gameover = true;
								gameWinner = 2;
								error = "Player 1: Illegal move: Not enough Students. ";
							}
							if ((students + attackingStudents) > totalStudents){
								gameover = true;
								gameWinner = 2;
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
							gameover = true;
							gameWinner = 2;
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
			if (move == null){
				error = "Player 2 did not submit a move.";
				gameover = true;
				gameWinner = 1;
				return error;
			}
			String [] botmove = move.split(";");
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
							gameover = true;
							gameWinner = 1;
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
								gameover = true;
								gameWinner = 1;
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
							gameover = true;
							gameWinner = 1;
							error = "Player 2: Illegal move: Not given a number, reinforce, or senior command. ";
						}
					}
				}
				if (botmove[2].equals("defend")){
					if (botmove[3].equals("senior")){
						if (EnemySeniors == 0){
							gameover = true;
							gameWinner = 1;
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
								gameover = true;
								gameWinner = 1;
								error = "Player 2: Illegal move: Not enough Students. ";
							}
							if ((students + botAttackingStudents) > EnemyStudents){
								gameover = true;
								gameWinner = 1;
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
							gameover = true;
							gameWinner = 1;
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
		
		ArrayList<Change> changes = new ArrayList<Change>();
		String gameState = null;
		int maxbound;
		int changenum = 0;
		if (EnemyStudents == 0 && totalStudents == 0) {
			maxbound = 1;
		}
		else if (EnemyStudents > totalStudents) {
			maxbound = EnemyStudents;
		}
		else {
			maxbound = totalStudents;
		}
		int attackheight = 50;
		int attackwidth = 50;
		int defendheight = 50;
		int defendwidth = 50;
		// Save copy of current player
		int pastPlayer = getCurrentPlayer();

		// Add logic to update state based on valid move
		// This is done in isValidMove mostly
		
		// determine next current player
		if (getCurrentPlayer() == 1){
			currentPlayer = 2;
			attackheight = 50 + (150 * attackingStudents) / maxbound;
			defendheight = 50 + (150 * defendingStudents) / maxbound;
			attackwidth = 50 + (50 * attackingStudents) / maxbound;
			defendwidth = 50 + (50 * defendingStudents) / maxbound;
			if (attackSenior && defendSenior){
				playeroneprevious += "senior:senior:";
				attackheight = 225;
				attackwidth = 125;
				defendheight = 225;
				defendwidth = 125;
			}
			if (attackSenior && !defendSenior){
				playeroneprevious += "senior:" + defendingStudents + ":";
				attackheight = 225;
				attackwidth = 125;
			}
			if (!attackSenior && defendSenior){
				playeroneprevious += attackingStudents + ":" + "senior:";
				defendheight = 225;
				defendwidth = 125;
			}
			if (!attackSenior && !defendSenior){
				playeroneprevious += attackingStudents + ":" + defendingStudents + ":";
			}
			
			
			if (rounds != 1) {
				changes.add(new Change());
				changes.get(changenum).id = 5;
				changes.get(changenum).actions = new ArrayList<Action>();
				changes.get(changenum).actions.add(new Action());
				changes.get(changenum).actions.get(0).args.add("action:walk");
				changes.get(changenum).actions.get(0).args.add("start:0.0");
				changes.get(changenum).actions.get(0).args.add("end:0.4");
				changes.get(changenum).actions.get(0).args.add("x:650");
				changes.get(changenum).actions.get(0).args.add("flipped:false");
				changenum++;
				
				changes.add(new Change());
				changes.get(changenum).id = 3;
				changes.get(changenum).actions = new ArrayList<Action>();
				changes.get(changenum).actions.add(new Action());
				changes.get(changenum).actions.get(0).args.add("action:walk");
				changes.get(changenum).actions.get(0).args.add("start:0.0");
				changes.get(changenum).actions.get(0).args.add("end:0.4");
				changes.get(changenum).actions.get(0).args.add("x:150");
				changes.get(changenum).actions.get(0).args.add("flipped:true");
				changenum++;
				
				changes.add(new Change());
				changes.get(changenum).id = 2;
				changes.get(changenum).actions = new ArrayList<Action>();
				changes.get(changenum).actions.add(new Action());
				changes.get(changenum).actions.get(0).args.add("action:walk");
				changes.get(changenum).actions.get(0).args.add("start:0.4");
				changes.get(changenum).actions.get(0).args.add("end:0.5");
				changes.get(changenum).actions.get(0).args.add("visible:true");
				changenum++;
				
				changes.add(new Change());
				changes.get(changenum).id = 3;
				changes.get(changenum).actions = new ArrayList<Action>();
				changes.get(changenum).actions.add(new Action());
				changes.get(changenum).actions.get(0).args.add("action:walk");
				changes.get(changenum).actions.get(0).args.add("start:0.4");
				changes.get(changenum).actions.get(0).args.add("end:0.5");
				changes.get(changenum).actions.get(0).args.add("visible:true");
				changes.get(changenum).actions.get(0).args.add("flipped:false");
				changenum++;
				
				changes.add(new Change());
				changes.get(changenum).id = 4;
				changes.get(changenum).actions = new ArrayList<Action>();
				changes.get(changenum).actions.add(new Action());
				changes.get(changenum).actions.get(0).args.add("action:walk");
				changes.get(changenum).actions.get(0).args.add("start:0.4");
				changes.get(changenum).actions.get(0).args.add("end:0.5");
				changes.get(changenum).actions.get(0).args.add("visible:true");
				changenum++;
				
				changes.add(new Change());
				changes.get(changenum).id = 5;
				changes.get(changenum).actions = new ArrayList<Action>();
				changes.get(changenum).actions.add(new Action());
				changes.get(changenum).actions.get(0).args.add("action:walk");
				changes.get(changenum).actions.get(0).args.add("start:0.4");
				changes.get(changenum).actions.get(0).args.add("end:0.5");
				changes.get(changenum).actions.get(0).args.add("visible:true");
				changes.get(changenum).actions.get(0).args.add("flipped:true");
				changenum++;
			}
			
			changes.add(new Change());
			changes.get(changenum).id = 1;
			changes.get(changenum).actions = new ArrayList<Action>();
			changes.get(changenum).actions.add(new Action());
			changes.get(changenum).actions.get(0).args.add("start:0.5");
			changes.get(changenum).actions.get(0).args.add("end:1.0");
			changes.get(changenum).actions.get(0).args.add("value:" + move);
			changes.get(changenum).actions.get(0).args.add("visible:true");
			changenum++;
			
			//Need JSON here to represent player 1 unit growth
			changes.add(new Change());
			changes.get(changenum).id = 2;
			changes.get(changenum).actions = new ArrayList<Action>();
			changes.get(changenum).actions.add(new Action());
			changes.get(changenum).actions.get(0).args.add("action:defend");
			changes.get(changenum).actions.get(0).args.add("start:0.5");
			changes.get(changenum).actions.get(0).args.add("end:1.0");
			changes.get(changenum).actions.get(0).args.add("width:" + defendwidth);
			changes.get(changenum).actions.get(0).args.add("height:" + defendheight);
			changenum++;
			
			
			changes.add(new Change());
			changes.get(changenum).id = 3;
			changes.get(changenum).actions = new ArrayList<Action>();
			changes.get(changenum).actions.add(new Action());
			changes.get(changenum).actions.get(0).args.add("action:walk");
			changes.get(changenum).actions.get(0).args.add("start:0.5");
			changes.get(changenum).actions.get(0).args.add("end:1.0");
			changes.get(changenum).actions.get(0).args.add("width:" + attackwidth);
			changes.get(changenum).actions.get(0).args.add("height:" + attackheight);
			changenum++;
			
			
		}
		else if (getCurrentPlayer() == 2){
			currentPlayer = 1;
			rounds++;
			attackheight = 50 + (150 * attackingStudents) / maxbound;
			defendheight = 50 + (150 * defendingStudents) / maxbound;
			attackwidth = 50 + (50 * attackingStudents) / maxbound;
			defendwidth = 50 + (50 * defendingStudents) / maxbound;
			if (botAttackSenior && botDefendSenior){
				playertwoprevious += "senior:senior:";
				attackheight = 225;
				attackwidth = 125;
				defendheight = 225;
				defendwidth = 125;
			}
			if (botAttackSenior && !botDefendSenior){
				playertwoprevious += "senior:" + botDefendingStudents + ":";
				attackheight = 225;
				attackwidth = 125;
			}
			if (!botAttackSenior && botDefendSenior){
				playertwoprevious += botAttackingStudents + ":" + "senior:";
				defendheight = 225;
				defendwidth = 125;
			}
			if (!botAttackSenior && !botDefendSenior){
				playertwoprevious += botAttackingStudents + ":" + botDefendingStudents + ":";
			}
			
			//Need JSON here to represent player 2 unit growth
			
			changes.add(new Change());
			changes.get(changenum).id = 1;
			changes.get(changenum).actions = new ArrayList<Action>();
			changes.get(changenum).actions.add(new Action());
			changes.get(changenum).actions.get(0).args.add("start:0.0");
			changes.get(changenum).actions.get(0).args.add("end:0.5");
			changes.get(changenum).actions.get(0).args.add("value:" + move);
			changenum++;
			
			changes.add(new Change());
			changes.get(changenum).id = 4;
			changes.get(changenum).actions = new ArrayList<Action>();
			changes.get(changenum).actions.add(new Action());
			changes.get(changenum).actions.get(0).args.add("action:defend");
			changes.get(changenum).actions.get(0).args.add("start:0.0");
			changes.get(changenum).actions.get(0).args.add("end:0.5");
			changes.get(changenum).actions.get(0).args.add("width:" + defendwidth);
			changes.get(changenum).actions.get(0).args.add("height:" + defendheight);
			changenum++;
			
			changes.add(new Change());
			changes.get(changenum).id = 5;
			changes.get(changenum).actions = new ArrayList<Action>();
			changes.get(changenum).actions.add(new Action());
			changes.get(changenum).actions.get(0).args.add("action:walk");
			changes.get(changenum).actions.get(0).args.add("start:0.0");
			changes.get(changenum).actions.get(0).args.add("end:0.5");
			changes.get(changenum).actions.get(0).args.add("width:" + attackwidth);
			changes.get(changenum).actions.get(0).args.add("height:" + attackheight);
			changenum++;
			
			changes.add(new Change());
			changes.get(changenum).id = 5;
			changes.get(changenum).actions = new ArrayList<Action>();
			changes.get(changenum).actions.add(new Action());
			changes.get(changenum).actions.get(0).args.add("action:walk");
			changes.get(changenum).actions.get(0).args.add("start:0.5");
			changes.get(changenum).actions.get(0).args.add("end:0.9");
			changes.get(changenum).actions.get(0).args.add("x:175");
			changenum++;
			
			changes.add(new Change());
			changes.get(changenum).id = 3;
			changes.get(changenum).actions = new ArrayList<Action>();
			changes.get(changenum).actions.add(new Action());
			changes.get(changenum).actions.get(0).args.add("action:walk");
			changes.get(changenum).actions.get(0).args.add("start:0.5");
			changes.get(changenum).actions.get(0).args.add("end:0.9");
			changes.get(changenum).actions.get(0).args.add("x:625");
			changenum++;
			
			changes.add(new Change());
			changes.get(changenum).id = 1;
			changes.get(changenum).actions = new ArrayList<Action>();
			changes.get(changenum).actions.add(new Action());
			changes.get(changenum).actions.get(0).args.add("start:0.5");
			changes.get(changenum).actions.get(0).args.add("end:1.0");
			changes.get(changenum).actions.get(0).args.add("value:" + move);
			changes.get(changenum).actions.get(0).args.add("visible:false");
			changenum++;
			
				//If one side sends a senior while the other does not, that side
			//will claim the round and capture all opposing students.
			boolean player1success = false;
			boolean player2success = false;
			if (botAttackSenior && !defendSenior){
				totalStudents -= defendingStudents;
				EnemyFlagsCaptured += 1;
				player2success = true;
				//followed by JSON representing capture
				
				changes.add(new Change());
				changes.get(changenum).id = 5;
				changes.get(changenum).actions = new ArrayList<Action>();
				changes.get(changenum).actions.add(new Action());
				changes.get(changenum).actions.get(0).args.add("action:attack");
				changes.get(changenum).actions.get(0).args.add("x:50");
				changes.get(changenum).actions.get(0).args.add("start:0.9");
				changes.get(changenum).actions.get(0).args.add("end:1.0");
				changenum++;
				
				changes.add(new Change());
				changes.get(changenum).id = 2;
				changes.get(changenum).actions = new ArrayList<Action>();
				changes.get(changenum).actions.add(new Action());
				changes.get(changenum).actions.get(0).args.add("action:fall");
				changes.get(changenum).actions.get(0).args.add("start:0.9");
				changes.get(changenum).actions.get(0).args.add("end:1.0");
				changes.get(changenum).actions.get(0).args.add("visible:false");
				changes.get(changenum).actions.get(0).args.add("width:50");
				changes.get(changenum).actions.get(0).args.add("height:50");
				changenum++;
				
				changes.add(new Change());
				changes.get(changenum).id = 7;
				changes.get(changenum).actions = new ArrayList<Action>();
				changes.get(changenum).actions.add(new Action());
				changes.get(changenum).actions.get(0).args.add("start:0.9");
				changes.get(changenum).actions.get(0).args.add("end:1.0");
				changes.get(changenum).actions.get(0).args.add("value:" + "Flags Captured- " + EnemyFlagsCaptured);
				changenum++;
			}
			if (attackSenior && !botDefendSenior){
				EnemyStudents -= botDefendingStudents;
				flagsCaptured += 1;
				player1success = true;
				//followed by JSON representing capture
				
				changes.add(new Change());
				changes.get(changenum).id = 3;
				changes.get(changenum).actions = new ArrayList<Action>();
				changes.get(changenum).actions.add(new Action());
				changes.get(changenum).actions.get(0).args.add("action:attack");
				changes.get(changenum).actions.get(0).args.add("x:750");
				changes.get(changenum).actions.get(0).args.add("start:0.9");
				changes.get(changenum).actions.get(0).args.add("end:1.0");
				changenum++;
				
				changes.add(new Change());
				changes.get(changenum).id = 4;
				changes.get(changenum).actions = new ArrayList<Action>();
				changes.get(changenum).actions.add(new Action());
				changes.get(changenum).actions.get(0).args.add("action:fall");
				changes.get(changenum).actions.get(0).args.add("start:0.9");
				changes.get(changenum).actions.get(0).args.add("end:1.0");
				changes.get(changenum).actions.get(0).args.add("visible:false");
				changes.get(changenum).actions.get(0).args.add("width:50");
				changes.get(changenum).actions.get(0).args.add("height:50");
				changenum++;
				
				changes.add(new Change());
				changes.get(changenum).id = 6;
				changes.get(changenum).actions = new ArrayList<Action>();
				changes.get(changenum).actions.add(new Action());
				changes.get(changenum).actions.get(0).args.add("start:0.9");
				changes.get(changenum).actions.get(0).args.add("end:1.0");
				changes.get(changenum).actions.get(0).args.add("value:" + "Flags Captured- " + flagsCaptured);
				changenum++;
			}
			if (botDefendSenior && !attackSenior){
				totalStudents -= attackingStudents;
				//followed by JSON representing capture
				
				changes.add(new Change());
				changes.get(changenum).id = 4;
				changes.get(changenum).actions = new ArrayList<Action>();
				changes.get(changenum).actions.add(new Action());
				changes.get(changenum).actions.get(0).args.add("action:defend");
				changes.get(changenum).actions.get(0).args.add("start:0.9");
				changes.get(changenum).actions.get(0).args.add("end:1.0");
				changenum++;
				
				changes.add(new Change());
				changes.get(changenum).id = 3;
				changes.get(changenum).actions = new ArrayList<Action>();
				changes.get(changenum).actions.add(new Action());
				changes.get(changenum).actions.get(0).args.add("action:fall");
				changes.get(changenum).actions.get(0).args.add("start:0.9");
				changes.get(changenum).actions.get(0).args.add("end:1.0");
				changes.get(changenum).actions.get(0).args.add("visible:false");
				changes.get(changenum).actions.get(0).args.add("width:50");
				changes.get(changenum).actions.get(0).args.add("height:50");
				changenum++;
			}
			if (defendSenior && !botAttackSenior){
				EnemyStudents -= botAttackingStudents;
				//followed by JSON representing capture
				
				changes.add(new Change());
				changes.get(changenum).id = 2;
				changes.get(changenum).actions = new ArrayList<Action>();
				changes.get(changenum).actions.add(new Action());
				changes.get(changenum).actions.get(0).args.add("action:attack");
				changes.get(changenum).actions.get(0).args.add("start:0.9");
				changes.get(changenum).actions.get(0).args.add("end:1.0");
				changenum++;
				
				changes.add(new Change());
				changes.get(changenum).id = 5;
				changes.get(changenum).actions = new ArrayList<Action>();
				changes.get(changenum).actions.add(new Action());
				changes.get(changenum).actions.get(0).args.add("action:fall");
				changes.get(changenum).actions.get(0).args.add("start:0.9");
				changes.get(changenum).actions.get(0).args.add("end:1.0");
				changes.get(changenum).actions.get(0).args.add("visible:false");
				changes.get(changenum).actions.get(0).args.add("width:50");
				changes.get(changenum).actions.get(0).args.add("height:50");
				changenum++;
			}
			//Otherwise, the player that sent the higher number of students will
			//claim victory for the round.
			if (!botDefendSenior && !attackSenior){
				if (attackingStudents > botDefendingStudents){
					EnemyStudents -= botDefendingStudents;
					flagsCaptured += 1;
					player1success = true;
					//followed by JSON
					changes.add(new Change());
					changes.get(changenum).id = 3;
					changes.get(changenum).actions = new ArrayList<Action>();
					changes.get(changenum).actions.add(new Action());
					changes.get(changenum).actions.get(0).args.add("action:attack");
					changes.get(changenum).actions.get(0).args.add("x:750");
					changes.get(changenum).actions.get(0).args.add("start:0.9");
					changes.get(changenum).actions.get(0).args.add("end:1.0");
					changenum++;
					
					changes.add(new Change());
					changes.get(changenum).id = 4;
					changes.get(changenum).actions = new ArrayList<Action>();
					changes.get(changenum).actions.add(new Action());
					changes.get(changenum).actions.get(0).args.add("action:fall");
					changes.get(changenum).actions.get(0).args.add("start:0.9");
					changes.get(changenum).actions.get(0).args.add("end:1.0");
					changes.get(changenum).actions.get(0).args.add("visible:false");
					changes.get(changenum).actions.get(0).args.add("width:50");
					changes.get(changenum).actions.get(0).args.add("height:50");
					changenum++;
					
					changes.add(new Change());
					changes.get(changenum).id = 6;
					changes.get(changenum).actions = new ArrayList<Action>();
					changes.get(changenum).actions.add(new Action());
					changes.get(changenum).actions.get(0).args.add("start:0.9");
					changes.get(changenum).actions.get(0).args.add("end:1.0");
					changes.get(changenum).actions.get(0).args.add("value:" + "Flags Captured- " + flagsCaptured);
					changenum++;
				}
				if (attackingStudents < botDefendingStudents){
				totalStudents -= attackingStudents;
				//followed by JSON
				
				changes.add(new Change());
				changes.get(changenum).id = 4;
				changes.get(changenum).actions = new ArrayList<Action>();
				changes.get(changenum).actions.add(new Action());
				changes.get(changenum).actions.get(0).args.add("action:defend");
				changes.get(changenum).actions.get(0).args.add("start:0.9");
				changes.get(changenum).actions.get(0).args.add("end:1.0");
				changenum++;
				
				changes.add(new Change());
				changes.get(changenum).id = 3;
				changes.get(changenum).actions = new ArrayList<Action>();
				changes.get(changenum).actions.add(new Action());
				changes.get(changenum).actions.get(0).args.add("action:fall");
				changes.get(changenum).actions.get(0).args.add("start:0.9");
				changes.get(changenum).actions.get(0).args.add("end:1.0");
				changes.get(changenum).actions.get(0).args.add("visible:false");
				changes.get(changenum).actions.get(0).args.add("width:50");
				changes.get(changenum).actions.get(0).args.add("height:50");
				changenum++;
				}
			}
			if (!botAttackSenior && !defendSenior){
				if (botAttackingStudents < defendingStudents){
					EnemyStudents -= botAttackingStudents;
					//followed by JSON
					
					changes.add(new Change());
					changes.get(changenum).id = 2;
					changes.get(changenum).actions = new ArrayList<Action>();
					changes.get(changenum).actions.add(new Action());
					changes.get(changenum).actions.get(0).args.add("action:attack");
					changes.get(changenum).actions.get(0).args.add("start:0.9");
					changes.get(changenum).actions.get(0).args.add("end:1.0");
					changenum++;
					
					changes.add(new Change());
					changes.get(changenum).id = 5;
					changes.get(changenum).actions = new ArrayList<Action>();
					changes.get(changenum).actions.add(new Action());
					changes.get(changenum).actions.get(0).args.add("action:fall");
					changes.get(changenum).actions.get(0).args.add("start:0.9");
					changes.get(changenum).actions.get(0).args.add("end:1.0");
					changes.get(changenum).actions.get(0).args.add("visible:false");
					changes.get(changenum).actions.get(0).args.add("width:50");
					changes.get(changenum).actions.get(0).args.add("height:50");
					changenum++;
				}
				if (botAttackingStudents > defendingStudents){
					totalStudents -= defendingStudents;
					EnemyFlagsCaptured += 1;
					player2success = true;
					//followed by JSON
					
					changes.add(new Change());
					changes.get(changenum).id = 5;
					changes.get(changenum).actions = new ArrayList<Action>();
					changes.get(changenum).actions.add(new Action());
					changes.get(changenum).actions.get(0).args.add("action:attack");
					changes.get(changenum).actions.get(0).args.add("x:50");
					changes.get(changenum).actions.get(0).args.add("start:0.9");
					changes.get(changenum).actions.get(0).args.add("end:1.0");
					changenum++;
					
					changes.add(new Change());
					changes.get(changenum).id = 2;
					changes.get(changenum).actions = new ArrayList<Action>();
					changes.get(changenum).actions.add(new Action());
					changes.get(changenum).actions.get(0).args.add("action:fall");
					changes.get(changenum).actions.get(0).args.add("start:0.9");
					changes.get(changenum).actions.get(0).args.add("end:1.0");
					changes.get(changenum).actions.get(0).args.add("visible:false");
					changes.get(changenum).actions.get(0).args.add("width:50");
					changes.get(changenum).actions.get(0).args.add("height:50");
					changenum++;
					
					changes.add(new Change());
					changes.get(changenum).id = 7;
					changes.get(changenum).actions = new ArrayList<Action>();
					changes.get(changenum).actions.add(new Action());
					changes.get(changenum).actions.get(0).args.add("start:0.9");
					changes.get(changenum).actions.get(0).args.add("end:1.0");
					changes.get(changenum).actions.get(0).args.add("value:" + "Flags Captured- " + EnemyFlagsCaptured);
					changenum++;
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
                	Random randomNumber = new Random();
                	int win = randomNumber.nextInt(2);
                	win++;
                    gameWinner = win;
					gameover = true;
                }
               
            }
               
        }
		String inputForBot = "";
		if (pastPlayer == 1){
		inputForBot = EnemyStudents + ";" ;
		inputForBot += EnemySeniors + ";";
		inputForBot += (botPossible - EnemyStudents) + ";";
		inputForBot += (totalPossible - totalStudents) + ";";
		inputForBot += EnemyFlagsCaptured + ";";
		inputForBot += flagsCaptured + ";";
		inputForBot += rounds + ";";
		inputForBot += playertwoprevious;
		}
		if (pastPlayer == 2){
		inputForBot = totalStudents + ";" ;
		inputForBot += Seniors + ";";
		inputForBot += (totalPossible - totalStudents) + ";";
		inputForBot += (botPossible - EnemyStudents) + ";";
		inputForBot += flagsCaptured + ";";
		inputForBot += EnemyFlagsCaptured + ";";
		inputForBot += rounds + ";";
		inputForBot += playeroneprevious;
		}
		if (testMode) {
			gameState = "provide all needed state information";
		}

		// Sample turn JSON
		if (gameover){
			//Print out the winner
			if (gameWinner == 1){
				changes.add(new Change());
				changes.get(changenum).id = 1;
				changes.get(changenum).actions = new ArrayList<Action>();
				changes.get(changenum).actions.add(new Action());
				changes.get(changenum).actions.get(0).args.add("start:0.0");
				changes.get(changenum).actions.get(0).args.add("end:1.0");
				changes.get(changenum).actions.get(0).args.add("value:" + "Player 1 Wins");
				changes.get(changenum).actions.get(0).args.add("visible:true");
				changenum++;
			}
			else {
				changes.add(new Change());
				changes.get(changenum).id = 1;
				changes.get(changenum).actions = new ArrayList<Action>();
				changes.get(changenum).actions.add(new Action());
				changes.get(changenum).actions.get(0).args.add("start:0.0");
				changes.get(changenum).actions.get(0).args.add("end:1.0");
				changes.get(changenum).actions.get(0).args.add("value:" + "Player 2 Wins");
				changes.get(changenum).actions.get(0).args.add("visible:true");
				changenum++;
			}
		}
		
		if (testMode) {
			gameState = "";
			gameState += flagsCaptured + ";";
			gameState += EnemyFlagsCaptured + ";";
			gameState += Seniors + ";";
			gameState += EnemySeniors + ";";
			gameState += totalPossible + ";";
			gameState += botPossible + ";";
			gameState += totalStudents + ";";
			gameState += EnemyStudents + ";";
			gameState += attackingStudents + ";";
			gameState += botAttackingStudents + ";";
			gameState += defendingStudents + ";";
			gameState += botDefendingStudents + ";";
			if (attackSenior)
			gameState += "1" + ";";
			else
			gameState += "0" + ";";
			if (defendSenior)
			gameState += "1" + ";";
			else
			gameState += "0" + ";";
			if (botAttackSenior)
			gameState += "1" + ";";
			else
			gameState += "0" + ";";
			if (botDefendSenior)
			gameState += "1" + ";";
			else
			gameState += "0" + ";";
			if (gameover)
			gameState += "1" + ";";
			else
			gameState += "0" + ";";
			
			gameState += gameWinner + ";";
			gameState += rounds + ";";
			gameState += playeroneprevious + ";";
			gameState += playertwoprevious + ";";
		}
		
		// Uncomment to view turn json prior to being returned in object
		 //JsonObjectBuilder turn = buildTurnJson(1.0, changes, 1, 1);
		 //System.out.println("\n\nSample turn JSON object\n\n");
		 //System.out.println(turn.build().toString());

		return new GameState(inputForBot, gameState, buildTurnJson(
			1.0, changes, pastPlayer, getCurrentPlayer()));
	}

	public void loadGameState(String state, int player) {
		// This will be invoked only in test mode.
		// Pass all state information and next player here, reconstruct
		// previous game state.
		if (state != null){
			String [] newState = state.split(";");
			flagsCaptured = Integer.parseInt(newState[0]);
			EnemyFlagsCaptured = Integer.parseInt(newState[1]);
			Seniors = Integer.parseInt(newState[2]);
			EnemySeniors = Integer.parseInt(newState[3]);
			totalPossible = Integer.parseInt(newState[4]);
			botPossible = Integer.parseInt(newState[5]);
			totalStudents = Integer.parseInt(newState[6]);
			EnemyStudents = Integer.parseInt(newState[7]);
			attackingStudents = Integer.parseInt(newState[8]);
			botAttackingStudents = Integer.parseInt(newState[9]);
			defendingStudents = Integer.parseInt(newState[10]);
			botDefendingStudents = Integer.parseInt(newState[11]);
			if (newState[12] == "1")
				attackSenior = true;
			else
				attackSenior = false;
			if (newState[13] == "1")
				defendSenior = true;
			else
				defendSenior = false;
			if (newState[14] == "1")
				botAttackSenior = true;
			else
				botAttackSenior = false;
			if (newState[15] == "1")
				botDefendSenior = true;
			else
				botDefendSenior = false;
			if (newState[16] == "1")
				gameover = true;
			else
				gameover = false;
			gameWinner = Integer.parseInt(newState[17]);
			rounds = Integer.parseInt(newState[18]);
			playeroneprevious = newState[19];
			playertwoprevious = newState[20];
		}
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
