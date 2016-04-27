import javax.json.*;

public class GameState {
    public String botInput;
    public String gameState;
    public JsonObjectBuilder jsonBuilder;

    public GameState() {}
    public GameState(String botInput, String gameState, JsonObjectBuilder jsonBuilder) {
        this.botInput = botInput;
        this.gameState = gameState;
        this.jsonBuilder = jsonBuilder;
    }
}