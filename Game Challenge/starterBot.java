import java.util.*;

public class Bot {
	public static void main(String[] args){
	
		// grabs turn input and parses relevant data to start
	
		// scanner to return input from game
		Scanner in = new Scanner(System.in);
		// input of current turn
		String input = in.nextLine();
		// separates relevant data
		String[] info = input.split(";");

		// parse relevant data into variables
		int numStudents = Integer.parseInt(info[0]);
		int numSeniors = Integer.parseInt(info[1]);
		int myStudentsCapped = Integer.parseInt(info[2]);
		int enemyStudentsCapped = Integer.parseInt(info[3]);
		int myFlags = Integer.parseInt(info[4]);
		int enemyFlags = Integer.parseInt(info[5]);
		int turn = Integer.parseInt(info[6]);	
		// holds previous user turns
		String[] myPastTurns = info[7].split(":");
		// format of past turn is numAttack:numDefend:result
		String result;
		// todo code bot logic and output
		
		
		
		
		
		
		System.out.println(result);
	}
}