import java.util.Scanner;


public class Flagger {

	public static void main(String args[]){
	
		
	int flagsCaptured = 0;
	int flagsNeeded = 10;
	int Seniors = 3;
	int turn = 1;
	int EnemySeniors = 3;
	int EnemyFlagsCaptured = 0;
	
	//Deciding to make it easier to change
	//the total number of students
	int totalPossible = 150;
	int EnemyStudents = totalPossible;
	int totalStudents = totalPossible;
	Scanner sc = new Scanner(System.in);
	System.out.println("Total Students: " + totalStudents);
	System.out.println("Total Seniors: " + Seniors);
	System.out.println("Flags Captured: " + flagsCaptured);
	System.out.println("Enemy Flags Captured: " + EnemyFlagsCaptured);

	System.out.print("Enter a command: ");
	
	while (sc.hasNext()){
		String inputstring = sc.next();
		String[] parts = inputstring.split(";");
		if (parts[0].equals("senior")){
			if (Seniors == 0){
				System.out.println("Illegal move: Not enough Seniors.");
			}
			else {
				Seniors--;
			}
		}
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
		if (parts[0].equals("free")){
			//This is here in case we change the freedom rules
			if (totalStudents >= totalPossible){
				totalStudents = totalPossible;
			}
			else {
				totalStudents += (totalPossible - totalStudents)/2 ;
			}
		}
		
		String botTurn = easybot(EnemyStudents, turn, EnemySeniors);
		
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
		if (botmove[0].equals("senior") && parts[0].equals("senior")){
			
		}
		else if (botmove[0].equals("senior")){
			totalStudents -= sentStudents;
			EnemyFlagsCaptured += 1;
		}
		else if (parts[0].equals("senior")){
			EnemyStudents -= botStudents;
			flagsCaptured += 1;
		}
		else if (sentStudents > botStudents){
			EnemyStudents -= botStudents;
			flagsCaptured += 1;
		}
		else if (sentStudents < botStudents){
			totalStudents -= sentStudents;
			EnemyFlagsCaptured += 1;
		}
		else {
			
		}
		System.out.println("Students Remaining " + totalStudents);
		System.out.println("Seniors Remaining: " + Seniors);
		System.out.println("Ally Students Captured: " + (totalPossible - totalStudents));
		System.out.println("Enemy Students Captured: " + (totalPossible - EnemyStudents));
		System.out.println("Flags Captured: " + flagsCaptured);
		System.out.println("Enemy Flags Captured: " + EnemyFlagsCaptured);
	
		if (flagsCaptured == flagsNeeded){
			System.out.println("You win!");
			break;
		}
		if (EnemyFlagsCaptured == flagsNeeded){
			System.out.println("You lose.");
		}
		turn++;
		System.out.print("Enter a command:    ");
		}
	
	}
	public static String easybot(int Studentsleft, int turnnum, int Seniorsleft) {
		if (turnnum % 3 == 0) {
			if (Seniorsleft != 0) {
				return 	"senior";			
			}
		}
		else if (Studentsleft >= 50){
				return "send;50";
		}
		else return "free";
		return "free";
	}
}
