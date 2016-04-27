import javax.json.*;
import java.util.ArrayList;

/**
 * Abstract class that all games must extend from.
 * 
 * @author Brandon Cercone
 * @author Nathan Dudding
 * @author Wei Hsien Lo
 * @author Joshua Riojas
 * @since 2016-03-29
 */
public abstract class Game {

    protected final String assetBasePath = "games/";
    protected int currentPlayer;

    public JsonObjectBuilder initializeJson(String backgroundURI, double timestep,
            int defaultBot, ArrayList<Image> images, ArrayList<Entity> entities) {

        JsonObjectBuilder buildInit = Json.createObjectBuilder();
        JsonArrayBuilder buildEntities = Json.createArrayBuilder();
        JsonArrayBuilder buildImages = Json.createArrayBuilder();

        for (int i = 0; i < entities.size(); ++i) {
            JsonObjectBuilder buildEntity = Json.createObjectBuilder()
                .add("id", entities.get(i).id)
                .add("type", entities.get(i).type)
                .add("visible", entities.get(i).visible)
                .add("initX", entities.get(i).initX)
                .add("initY", entities.get(i).initY)
                .add("width", entities.get(i).width)
                .add("height", entities.get(i).height)
                .add("flipped", entities.get(i).flipped)
                .add("rotation", entities.get(i).rotation);
            buildInitializeArguments(entities.get(i).args, buildEntity);
            buildEntities.add(buildEntity);
        }

        for (int i = 0; i < images.size(); ++i) {
            buildImages.add(Json.createObjectBuilder()
                .add("imagePath", images.get(i).path)
                .add("name", images.get(i).name));
        }


        buildInit.add("background", backgroundURI)
            .add("defaultTimestep", timestep)
            .add("defaultBot", defaultBot)
            //.add("mapId", mapId)
            .add("imagesToLoad", buildImages)
            .add("entity", buildEntities);

        return buildInit;
    }

    public void buildInitializeArguments(ArrayList<String> args, JsonObjectBuilder entityObject) {
        String [] argEntry;

        for (int i = 0; i < args.size(); ++i) {
            argEntry = args.get(i).split(":");
            try {
                switch (argEntry[0]) {
                    case "wordWrap":
                        if (argEntry[1].equals("true")) {
                            entityObject.add(argEntry[0], true);
                        }
                        else if (argEntry[1].equals("false")) {
                            entityObject.add(argEntry[0], false);
                        }
                        else {
                            entityObject.add(argEntry[0], argEntry[1]);
                        }
                        break;
                    case "strokeThickness":
                    case "wordWrapWidth":
                    case "tabs":
                        entityObject.add(argEntry[0], Integer.parseInt(argEntry[1]));
                        break;
                    case "fontSize":
                        if (canCastToInteger(argEntry[1])) {
                            entityObject.add(argEntry[0], Integer.parseInt(argEntry[1]));
                        }
                        else {
                            entityObject.add(argEntry[0], argEntry[1]);
                        }
                        break;
                    default:
                        entityObject.add(argEntry[0], argEntry[1]);
                        break;
                }
            }
            catch (Exception e) {
                // Invalid JSON attributes
            }
        }
    }

     public JsonObjectBuilder buildTurnJson(double timescale, ArrayList<Change> changes,
        int currentPlayer, int nextPlayer) {
            JsonObjectBuilder turnsBuilder = Json.createObjectBuilder();

            turnsBuilder.add("timescale", timescale)
            .add("turnChanges", buildChanges(changes))
            .add("currentPlayer", currentPlayer)
            .add("nextPlayer", nextPlayer);

            return turnsBuilder;
    }

    public JsonArray buildChanges(ArrayList<Change> changes) {
            JsonArrayBuilder changesBuilder = Json.createArrayBuilder();

            for (int i = 0; i < changes.size(); ++i) {
                JsonObjectBuilder change = Json.createObjectBuilder();
                change.add("id", changes.get(i).id)
                .add("changes", buildChangeActions(changes.get(i).actions));
                changesBuilder.add(change.build());
            }
            return changesBuilder.build();
    }

    public JsonArray buildChangeActions(ArrayList<Action> actions) {
        JsonArrayBuilder     actionsBuilder = Json.createArrayBuilder();

        for (int i = 0; i < actions.size(); ++i) {
            JsonObjectBuilder actionBuilder = Json.createObjectBuilder();
            //actionBuilder.add("action", actions.get(i).action)
            //.add("start", actions.get(i).starttime)
            //.add("end", actions.get(i).endtime)
            buildActionArguments(actions.get(i).args, actionBuilder);
            actionsBuilder.add(actionBuilder.build());
        }
        
        return actionsBuilder.build();
    }

    public void buildActionArguments(ArrayList<String> args, JsonObjectBuilder argsObject) {
        String [] argEntry;

        for (int i = 0; i < args.size(); ++i) {
            argEntry = args.get(i).split(":");
            try {
                switch (argEntry[0]) {
                    case "wordWrap":
                    case "flipped":
                    case "visible":
                        if (argEntry[1].equals("true")) {
                            argsObject.add(argEntry[0], true);
                        }
                        else if (argEntry[1].equals("false")) {
                            argsObject.add(argEntry[0], false);
                        }
                        else {
                            argsObject.add(argEntry[0], argEntry[1]);
                        }
                        break;
                    case "strokeThickness":
                    case "wordWrapWidth":
                    case "tabs":
                        argsObject.add(argEntry[0], Integer.parseInt(argEntry[1]));
                        break;
                    case "fontSize":
                    case "x":
                    case "y":
                    case "width":
                    case "height":
                        if (canCastToInteger(argEntry[1])) {
                            argsObject.add(argEntry[0], Integer.parseInt(argEntry[1]));
                        }
                        else {
                            argsObject.add(argEntry[0], argEntry[1]);
                        }
                        break;
                    case "rotation":
                    case "start":
                    case "end":
                        if (canCastToDouble(argEntry[1])) {
                            argsObject.add(argEntry[0], Double.parseDouble(argEntry[1]));    
                        }
                        else {
                            argsObject.add(argEntry[0], argEntry[1]);
                        }
                        break;
                    default:
                        argsObject.add(argEntry[0], argEntry[1]);
                        break;
                }
            }
            catch (Exception e) {
                // Invalid JSON attributes
            }
        }
    }

    public boolean canCastToInteger(String value) {
        try {
            Integer.parseInt(value);
            return true;
        }
        catch (Exception e) {
            return false;
        }
    }

    public boolean canCastToDouble(String value) {
        try {
            Double.parseDouble(value);
            return true;
        }
        catch (Exception e) {
            return false;
        }
    }

    /**
     * This method is called before all other methods; it initializes the game and returns
     * the initial game state in the form of a GameState class. This method should call
     * the initializeJson method to construct the JSON portion of its return object
     *
     * @return GameState    GameState class containing the input being sent to the bot,  
     *                      game state information that can be passed to loadGameState 
     *                      if needed, and the JsonObjectBuilder containing the 
     *                      information for a turn.  
     * 
     * @param  testMode     Flag passed to game to enable the build of game state
     *                      information to be stored in the GameState object returned
     *                      by initializeGame and updateState.
     */
    public abstract GameState initializeGame(boolean testMode);

    /**
     * This method takes a move as input and should return null if the the move is valid
     * or the error message stating why it is not valid.
     *
     * @param move String representation of a bot's move
     * @return String 
     *
     */
    public abstract String isMoveValid(String move);

    /**
     * This method takes a bot's move and updates the current game state based on that 
     * move and returns that state.
     *
     * @param move          String representation of a bot's move
     * @return GameState    GameState class containing the input being sent to the bot,  
     *                      game state information that can be passed to loadGameState 
     *                      if needed, and the JsonObjectBuilder containing the 
     *                      information for a turn.
     *
     * @param  testMode     Flag passed to game to enable the build of game state
     *                      information to be stored in the GameState object returned
     *                      by initializeGame and updateState.     
     */
    public abstract GameState updateState(String move, boolean testMode);
    
    /**
     * This method should load a pasted board state and current player to the ones
     * passes as parameters.
     *
     * @param state String representation of a game state
     * @param player Integer value for current player
     *
     */
    public abstract void loadGameState(String state, int player);

    /**
     * Condition for the main game loop.
     *
     * @return boolean  This returns whether or not the game is over. Came will end if 
     *                  false is returned.
     *
     */
    public abstract boolean isGameOver();

    /**
     * This method returns the integer value of the current player.
     *
     * @return int
     *
     */
    public abstract int getCurrentPlayer();

    /**
     * Returns the winner of the game
     *
     * @return int
     *
     */
    public abstract int getWinner();
}


/**
 * Container classes
 */
class Entity {
    public int                  id;
    public String               type;
    public boolean              visible;
    public int                  initX;
    public int                  initY;
    public int                  width;
    public int                  height;
    public boolean              flipped;
    public double               rotation;
    public ArrayList<String>    args;

    public Entity() {
        args = new ArrayList<String>();
    }
}

class Image {
    public String               path;
    public String               name;

    public Image(String path, String name) {
        this.path = path;
        this.name = name;
    }
}

class Change {
    public int                  id;
    public ArrayList<Action>    actions;
}

class Action {
    public ArrayList<String>    args;

    public Action() {
        args = new ArrayList<String>();
    }
}