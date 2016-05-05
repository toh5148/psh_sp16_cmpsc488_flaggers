import java.util.*;

public class Bot {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		String input = sc.nextLine();
		input = sc.nextLine();
		sc.close();

		String[] info = input.split(";");
		int numStudents = Integer.parseInt(info[0]);
		int numSeniors = Integer.parseInt(info[1]);
		int turn = Integer.parseInt(info[6]);
		//This bot will attempt to send a senior student every 3rd turn
        //so long as one is available.
        String returnString = "";
        if (turn % 3 == 0) {
            if (numSeniors != 0) {
                returnString += "attack;senior;defend;" + numStudents;           
            }
            else if (numStudents >= 50){
                returnString += "attack;50;defend;" + (numStudents - 50);
            }
        }
        //It will send exactly 50 students each round otherwise,
        else if (numStudents >= 50){
            returnString += "attack;50;defend;" + (numStudents - 50);
        }
        //and will attempt to free any students it can to reach a comfortable
        //50 students to send.
        else returnString = "free";
		
		System.out.println(returnString);
		
		
	}
}