import java.util.Scanner;


public class Flagger {

	public static void main(String args[]){
	
	//Variables used to keep track of game data
	int flagsCaptured = 0;
	int flagsNeeded = 10;
	int Seniors = 3;
	int turn = 1;
	int EnemySeniors = 3;
	int EnemyFlagsCaptured = 0;
	
	//Easy variables used to change the total number of students.
	//Might add a growth rate variable later, which could add to complexity.
	//I'm still debating on that fact.  It has both pros and cons.
	int totalPossible = 150;
	int EnemyStudents = totalPossible;
	int totalStudents = totalPossible;
	
	Scanner sc = new Scanner(System.in);
	
	//Initial data relayed to a human user.  In the bot game version,
	//this information will be identifiable in the passed input string.
	
	System.out.println("Total Students: " + totalStudents);
	System.out.println("Total Seniors: " + Seniors);
	System.out.println("Flags Captured: " + flagsCaptured);
	System.out.println("Enemy Flags Captured: " + EnemyFlagsCaptured);

	System.out.print("Enter a command: ");
	
	while (sc.hasNext()){
		String inputstring = sc.next();
		
		//Split the input string into parts to separate "action" from "amount"
		String[] parts = inputstring.split(";");
		
		//Condition makes sure that a user has enough seniors, and then sends one.
		if (parts[0].equals("senior")){
			if (Seniors == 0){
				System.out.println("Illegal move: Not enough Seniors.");
			}
			else {
				Seniors--;
			}
		}
		//Condition makes sure a user has enough students, and then sends them.
		int sentStudents = 0;
		if (parts[0].equals("send")){
			int students = Integer.parseInt(parts[1]);
			if (students > totalStudents){
				System.out.println("Illegal move: Not enough Students.");
			}
			else
			{
				sentStudents = students;
			}
		}
		
		//This condition determines the number of students freed by the "free" action.
		if (parts[0].equals("free")){
			//This is here in case we change the freedom rules
			if (totalStudents >= totalPossible){
				totalStudents = totalPossible;
			}
			else {
				totalStudents += (totalPossible - totalStudents)/2 ;
			}
		}
		
		//Bot determining function call.  Changes depending on bot.
		String botTurn = easybot(EnemyStudents, turn, EnemySeniors);
		
		//Cloned conditions mirroring the above checks on the human user.
		//Not entirely needed for the easy bot written, but still useful for
		//creating new bots to test around with.
		String[] botmove = botTurn.split(";");
		if (botmove[0].equals("senior")){
			if (EnemySeniors == 0){
				System.out.println("Bot Illegal move: Not enough Seniors.");
			}
			else {
				EnemySeniors--;
			}
		}
		int botStudents = 0;
		if (botmove[0].equals("send")){
			int students = Integer.parseInt(botmove[1]);
			if (students > EnemyStudents){
				System.out.println("Bot Illegal move: Not enough Students.");
			}
			else
			{
				botStudents = students;
			}
		}
		if (botmove[0].equals("free")){
			//This is also here in case we wish to change "free"
			if (EnemyStudents >= totalPossible){
				EnemyStudents = totalPossible;
			}
			else {
				EnemyStudents += (totalPossible - EnemyStudents)/2 ;
			}
		}
		
		//Conditions used to print out if a bot or a user sent 
		//a Senior for the round.
		System.out.println();
		if (parts[0].equals("senior")){
			System.out.println("User Senior Sent");
		}
		if (botmove[0].equals("senior")){
			System.out.println("Bot Senior Sent");
		}
		System.out.println("Students sent: " + sentStudents);
		System.out.println("Enemies sent: " + botStudents);
		System.out.println();
		
		//Empty condition for senior ties.  Might make some special case happen.
		//Left here as a precaution, and a reminder.
		if (botmove[0].equals("senior") && parts[0].equals("senior")){
			
		}
		//If one side sends a senior while the other does not, that side
		//will claim the round and capture all opposing students.
		else if (botmove[0].equals("senior")){
			totalStudents -= sentStudents;
			EnemyFlagsCaptured += 1;
		}
		else if (parts[0].equals("senior")){
			EnemyStudents -= botStudents;
			flagsCaptured += 1;
		}
		//Otherwise, the player that sent the higher number of students will
		//claim victory for the round.
		else if (sentStudents > botStudents){
			EnemyStudents -= botStudents;
			flagsCaptured += 1;
		}
		else if (sentStudents < botStudents){
			totalStudents -= sentStudents;
			EnemyFlagsCaptured += 1;
		}
		//Empty else loop which can only be reached on "send" ties.
		//Also here as a bridge case, if I want something special to occur.
		else {
			
		}
		//These are the console messages that get printed out each round.
		//I'm using these to keep track of all important variables.
		System.out.println("Students Remaining " + totalStudents);
		System.out.println("Seniors Remaining: " + Seniors);
		System.out.println("Ally Students Captured: " + (totalPossible - totalStudents));
		System.out.println("Enemy Students Captured: " + (totalPossible - EnemyStudents));
		System.out.println("Flags Captured: " + flagsCaptured);
		System.out.println("Enemy Flags Captured: " + EnemyFlagsCaptured);
	
		//Victory condition check
		if (flagsCaptured == flagsNeeded){
			System.out.println("You win!");
			break;
		}
		if (EnemyFlagsCaptured == flagsNeeded){
			System.out.println("You lose.");
			break;
		}
		turn++;
		//Added this to better keep track of what commands the user entered.
		System.out.print("Enter a command:    ");
		}
	
	}
	//Method used to determine the easy challenge bot.  Will likely upload 3 different
	//bots into the final game challenge.
	public static String easybot(int Studentsleft, int turnnum, int Seniorsleft) {
		//This bot will attempt to send a senior student every 3rd turn
		//so long as one is available.
		if (turnnum % 3 == 0) {
			if (Seniorsleft != 0) {
				return 	"senior";			
			}
		}
		//It will send exactly 50 students each round otherwise,
		else if (Studentsleft >= 50){
				return "send;50";
		}
		//and will attempt to free any students it can to reach a comfortable
		//50 students to send.
		else return "free";
		return "free";
	}
}
