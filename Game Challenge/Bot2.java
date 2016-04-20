import java.util.*;

public class Bot {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		String input = sc.nextLine();
		input = sc.nextLine();
		
		String[] info = input.split(";");
		int numStudents = Integer.parseInt(info[0]);
		int numSeniors = Integer.parseInt(info[1]);
		int turn = Integer.parseInt(info[6]);
		//This bot will attempt to send a senior student every 4th turn
        //so long as one is available.
        String returnString = "";
        if (turn % 2 == 0) {
            if (numSeniors != 0) {
                returnString += "attack;" + numStudents + ";defend;senior";           
            }
            else if (numStudents >= 75){
                returnString += "attack;75;defend;" + (numStudents - 75);
            }
        }
        //It will send exactly 75 students each round otherwise,
        else if (numStudents >= 75){
            returnString += "attack;50;defend;" + (numStudents - 75);
        }
        //and will attempt to free any students it can to reach a comfortable
        //50 students to send.
        else returnString = "free";
		System.out.print(returnString);
		
		
	}
}
