import java.util.*;
/* 

note that this bot may not work
has not been tested
simple bot that randomly decides on what action to take
and how many units to send if any


*/
public class randomBot 
{
	public static void main(String[] args)
	{
		// scanner to return input from game
		Scanner in = new Scanner(System.in);
		// input of current turn
		String input = in.nextLine();
		// separate relevant data
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
		// format of past turn data = numAttack:numDefend:result
		
		// variables to hold move decision text
		String attackText = "";
		String defendText = "";
		int tmp = 0;
		
		Random rand = new Random();
		// random min 1, max 
		int n = rand.nextInt(9) + 1;
		switch(n)
		{
			case 1: 
				// reinforce on attack, reinforce on defend
				attackText = "attack;reinforce";
				defendText = ";defend;reinforce";
				System.out.println( attackText + defendText );
				break;
			case 2: 
				// reinforce on attack, defend with random amount
				int tmp = rand.nextInt(numStudents) + 1;
				attackText = "attack;reinforce";
				defendText = ";defend;" + tmp;
				System.out.println( attackText + defendText );
				break;
			case 3:
				// attack with random amount, reinforce on defend
				int tmp = rand.nextInt(numStudents) + 1;
				attackText = "attack;" + tmp;
				defendText = ";defend;reinforce";
				System.out.println( attackText + defendText );
				break;
			case 4:
				// attack with random amount, defend with rest
				int tmp = rand.nextInt(numStudents) +1;
				attackText = "attack;" + tmp;
				int tmp2 = numStudents - tmp;
				defendText = ";defend;" + tmp2;
				System.out.println( attackText + defendText );
				break;
			case 5:
				// send senior on attack if any left else reinforce, reinforce on defend
				if(numSeniors != 0)
				{
					// senior exist to send
					attackText = "attack;senior";
					defendText = ";defend;reinforce";
					System.out.println( attackText + defendText );
				}
				else
				{
					// no senior to send
					attackText = "attack;reinforce";
					defendText = ";defend;reinforce";
					System.out.println( attackText + defendText );
				}
				break;
			case 6:
				// reinforce on attack, send senior on defend if any left else reinforce
				if(numSeniors != 0)
				{
					// senior exist to send
					attackText = "attack;reinforce";
					defendText = ";defend;senior";
					System.out.println( attackText + defendText );
				}
				else
				{
					// no senior to send
					attackText = "attack;reinforce";
					defendText = ";defend;reinforce";
					System.out.println( attackText + defendText );
				}
				break;
			case 7:
				// send senior on attack if any left else reinforce, defend with random
				if
				(numSeniors != 0){
					// senior exist to send
					tmp = rand.nextInt(numStudents) + 1;
					attackText = "attack;senior";
					defendText = ";defend;" + tmp;
					System.out.println( attackText + defendText );
				}
				else
				{
					// no senior to send
					tmp = rand.nextInt(numStudents) + 1;
					attackText = "attack;reinforce";
					defendText = ";defend;" + tmp;
					System.out.println( attackText + defendText );
					System.out.println( attackText + defendText );
				}
				break;
			case 8:
				// attack with random, send senior to defend if any left else reinforce
				if(numSeniors != 0)
				{
					// senior exist to send
					tmp = rand.nextInt(numStudents) + 1;
					attackText = "attack;" + tmp;
					defendText = ";defend;senior";
					System.out.println( attackText + defendText );
				}
				else
				{
					// no senior to send
					tmp = rand.nextInt(numStudents) + 1;
					attackText = "attack;" + tmp;
					defendText = ";defend;reinforce";
					System.out.println( attackText + defendText );
				}
				break;
			case 9:
				// choose to free on turn instead
				System.out.println("free");
				break;
		}
	}
}
