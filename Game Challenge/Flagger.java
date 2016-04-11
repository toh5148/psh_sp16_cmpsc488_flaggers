import java.util.Scanner;


public class Flagger {

    public static void main(String args[]){
    //TODO Need to make the JSON turn array, and will ask (again, to be safe) about that format
        //this week.  After doing so, will need to implement the game logic within
        //the named functions, and make sure the return values line up for the
        //Game Evaluation team's specifications.  The while loop logic should be mostly fine,
        //but I'll need to change the input from System.in to the JSON string.
        
    //TODO Possibly add random chance to break ties.  Blum doesn't seem to like
        //the idea of ties for tournament play, and although I've made the odds of
        //a tie almost impossible in competative play, two students could easily
        //make two bots to intentionally make a tie.  Still, I don't know if I like
        //the random chance idea.  Still debating it.
   
    //Variables used to keep track of game data
    int flagsCaptured = 0;
    int flagsNeeded = 10;
    int Seniors = 5;
    int turn = 1;
    int EnemySeniors = 5;
    int EnemyFlagsCaptured = 0;
   
    //Easy variables used to change the total number of students.
    //Growth Rate has been added.
    int totalPossible = 150;
    int botPossible = 150;
    int EnemyStudents = totalPossible;
    int totalStudents = botPossible;
    int reinforceAmount = 10;
    boolean gameover = false;
    Scanner sc = new Scanner(System.in);
   
    //Initial data relayed to a human user.  In the bot game version,
    //this information will be identifiable in the passed input string.
   
    System.out.println("Total Students: " + totalStudents);
    System.out.println("Total Seniors: " + Seniors);
    System.out.println("Flags Captured: " + flagsCaptured);
    System.out.println("Enemy Flags Captured: " + EnemyFlagsCaptured);

    System.out.print("Enter a command: ");
   
   
    //This while loop will soon be put inside the Game Evaluation function
    //and the generate turn function should be called where I generate the
    //human and bot turns.
   
    while (sc.hasNext() && turn != 100){
        boolean attackSenior = false;
        boolean defendSenior = false;
        boolean botAttackSenior = false;
        boolean botDefendSenior = false;
        String inputstring = sc.next();
       
        //Split the input string into parts to separate "action" from "amount"
        String[] parts = inputstring.split(";");
       
        //Condition makes sure that a user has enough seniors, and then sends one.
        int attackingStudents = 0;
        int defendingStudents = 0;
        if (parts[0].equals("free")){
            //This is here in case we change the freedom rules
            if (totalStudents >= totalPossible){
                totalStudents = totalPossible;
            }
            else {
                totalStudents += (totalPossible - totalStudents)/2 ;
            }
        }   
        if (parts.length >= 4){
            if (parts[0].equals("attack")){
                if (parts[1].equals("senior")){
                    if (Seniors == 0){
                        System.out.println("Illegal move: Not enough Seniors.");
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
                            System.out.println("Illegal move: Not enough Students.");
                        }
                        else
                        {
                            attackingStudents = students;
                        }
                        }
                    catch (NumberFormatException e){
                        System.out.println("Illegal move: Not given a number, reinforce, or senior command. ");
                    }
                }
            }
            if (parts[2].equals("defend")){
                if (parts[3].equals("senior")){
                    if (Seniors == 0){
                        System.out.println("Illegal move: Not enough Seniors.");
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
                            System.out.println("Illegal move: Not enough Students.");
                        }
                        if ((students + attackingStudents) > totalStudents){
                            System.out.println("Illegal move: Attacking and defending students exceeds max limit.");
                        }
                        else
                        {
                            defendingStudents = students;
                        }
                    }
                    catch (NumberFormatException e){
                        System.out.println("Illegal move: Not given a number, reinforce, or senior command. ");
                    }
                }
            }
        }
        //Bot determining function call.  Changes depending on bot.
        String botTurn = easybot(EnemyStudents, turn, EnemySeniors);
       
        //Cloned conditions mirroring the above checks on the human user.
        //Not entirely needed for the easy bot written, but still useful for
        //creating new bots to test around with.
        String[] botmove = botTurn.split(";");
        int botAttackingStudents = 0;
        int botDefendingStudents = 0;
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
                        System.out.println("Illegal move: Not enough Seniors.");
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
                            System.out.println("Illegal move: Not enough Students.");
                        }
                        else
                        {
                            botAttackingStudents = students;
                        }
                    }
                    catch (NumberFormatException e){
                        System.out.println("Illegal move: Not given a number, reinforce, or senior command. ");
                    }
                }
            }
            if (botmove[2].equals("defend")){
                if (botmove[3].equals("senior")){
                    if (EnemySeniors == 0){
                        System.out.println("Illegal move: Not enough Seniors.");
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
                            System.out.println("Illegal move: Not enough Students.");
                        }
                        if ((students + botAttackingStudents) > EnemyStudents){
                            System.out.println("Illegal move: Attacking and defending students exceeds max limit.");
                        }
                        else
                        {
                            botDefendingStudents = students;
                        }
                    }
                    catch (NumberFormatException e){
                        System.out.println("Illegal move: Not given a number, reinforce, or senior command. ");
                    }
                }
            }
        }
       
        //Conditions used to print out if a bot or a user sent
        //a Senior for the round.
        System.out.println();
        if (attackSenior){
            System.out.println("User Attack Senior Sent");
        }
        if (defendSenior){
            System.out.println("User Defense Senior Sent");
        }
        if (botAttackSenior){
            System.out.println("Bot Attack Senior Sent");
        }
        if (botDefendSenior){
            System.out.println("Bot Defense Senior Sent");
        }
        System.out.println("Attack Students sent: " + attackingStudents);
        System.out.println("Enemy Attack Students sent: " + botAttackingStudents);
        System.out.println("Defending Students sent: " + defendingStudents);
        System.out.println("Enemy Defending Students sent: " + botDefendingStudents);
        System.out.println();
       
        //If one side sends a senior while the other does not, that side
        //will claim the round and capture all opposing students.
        if (botAttackSenior && !defendSenior){
            totalStudents -= defendingStudents;
            EnemyFlagsCaptured += 1;
        }
        if (attackSenior && !botDefendSenior){
            EnemyStudents -= botDefendingStudents;
            flagsCaptured += 1;
        }
        if (botDefendSenior && !attackSenior){
            totalStudents -= attackingStudents;
        }
        if (defendSenior && !botAttackSenior){
            EnemyStudents -= botAttackingStudents;
        }
        //Otherwise, the player that sent the higher number of students will
        //claim victory for the round.
        if (!botDefendSenior && !attackSenior){
            if (attackingStudents > botDefendingStudents){
                EnemyStudents -= botDefendingStudents;
                flagsCaptured += 1;
            }
            if (attackingStudents < botDefendingStudents){
            totalStudents -= attackingStudents;
            }
        }
        if (!botAttackSenior && !defendSenior){
            if (botAttackingStudents < defendingStudents){
                EnemyStudents -= botAttackingStudents;
            }
            if (botAttackingStudents > defendingStudents){
                totalStudents -= defendingStudents;
                EnemyFlagsCaptured += 1;
            }
        }

       
        //These are the console messages that get printed out each round.
        //I'm using these to keep track of all important variables.
        System.out.println("Students Remaining " + totalStudents);
        System.out.println("Seniors Remaining: " + Seniors);
        System.out.println("Ally Students Captured: " + (totalPossible - totalStudents));
        System.out.println("Enemy Students Captured: " + (botPossible - EnemyStudents));
        System.out.println("Flags Captured: " + flagsCaptured);
        System.out.println("Enemy Flags Captured: " + EnemyFlagsCaptured);
        gameover = false;
        //Victory condition check
       
        //Made ties much more difficult to happen.
        if (flagsCaptured >= flagsNeeded && EnemyFlagsCaptured >= flagsNeeded && flagsCaptured == EnemyFlagsCaptured){
            System.out.println("Game is currently tied. Next round is a tiebreaker.");
        }
        else if (flagsCaptured >= flagsNeeded){
            System.out.println("You win!");
            gameover = true;
            break;
        }
        else if (EnemyFlagsCaptured >= flagsNeeded){
            System.out.println("You lose.");
            gameover = true;
            break;
        }
        turn++;
        //Added this to better keep track of what commands the user entered.
        System.out.print("Enter a command: ");
        }
       
        //If the game is not over by turn 100, then
        //whoever has the most flags will win.
   
        //In the case of equal flags, whoever has the most students left will win.
   
        //If those are also equal, then both teams have played identically, and
        //the match will be declared a tie.
        if (turn == 100 && !gameover) {
            if (flagsCaptured > EnemyFlagsCaptured){
                System.out.println("You won the tiebreaker!");
            }
            else if (flagsCaptured < EnemyFlagsCaptured){
                System.out.println("You lost the tiebreaker!");
            }
            else {
                if (totalStudents > EnemyStudents){
                    System.out.println("You won the tiebreaker!");
                }
                else if (EnemyStudents > totalStudents){
                    System.out.println("You lost the tiebreaker!");
                }
                else {
                    System.out.println("It's a tie.");
                }
               
            }
               
        }
   
    }
    //Method used to determine the easy challenge bot.  Will likely upload 3 different
    //bots into the final game challenge.
    public static String easybot(int Studentsleft, int turnnum, int Seniorsleft) {
        //This bot will attempt to send a senior student every 3rd turn
        //so long as one is available.
        String returnString = "";
        if (turnnum % 3 == 0) {
            if (Seniorsleft != 0) {
                returnString += "attack;senior;defend;" + Studentsleft;           
            }
            else if (Studentsleft >= 50){
                returnString += "attack;50;defend;" + (Studentsleft - 50);
            }
        }
        //It will send exactly 50 students each round otherwise,
        else if (Studentsleft >= 50){
            returnString += "attack;50;defend;" + (Studentsleft - 50);
        }
        //and will attempt to free any students it can to reach a comfortable
        //50 students to send.
        else returnString = "free";
        return returnString;
    }
} 