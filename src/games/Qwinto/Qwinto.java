package games.Qwinto;

import gameClasses.Game;
import gameClasses.GameState;
import global.FileHelper;

import java.io.IOException;
import java.util.ArrayList;


//import server.Server;
import userManagement.User;

/**
 * Test game class extending Game and implementing the GameInterface
 * @author 
 *
 */


public class Qwinto extends Game {
	
	private int[] gridStatus = new int[85];
	private User playerTurn = null;
	private ArrayList<User> playerList = new ArrayList<User>();
	private ArrayList<User> spectatorList = new ArrayList<User>();	
	private String playerLeft = null;
	
	
	@Override
	public String getSite() {
		// TODO Auto-generated method stub
		try {
			return FileHelper.getFile("Qwinto/qwinto.html");
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public String getCSS() {
		// TODO Auto-generated met
	try {
		return global.FileHelper.getFile("Qwinto/css/Qwinto.css");
	} catch (IOException e) {
		System.err
				.println("Loading of file Qwinto/css/Qwinto.css failed");
	}
	return null;
	}

	@Override
	public String getJavaScript() {
		// TODO Auto-generated method stub
		return "<script src=\"javascript/Qwinto.js\"></script>";
		
	}

	@Override
	public int getMaxPlayerAmount() {
		// TODO Auto-generated method stub
		return 2;
	}

	@Override
	public int getCurrentPlayerAmount() {
		// TODO Auto-generated method stub
		return playerList.size();
	}

	@Override
	public void execute(User user, String gsonString) {
		// TODO Auto-generated method stub
		
		System.out.println("");
		System.out.println("Execute-Methode aufgerufen mit Daten:");
		System.out.println(user.getName() + ", " + gsonString);
		
		// Wenn Spiel geschlossen ist mache nichts
        if(this.gState==GameState.CLOSED) return;
        
		// Wenn geschlossen werden soll, schliesse
		if(gsonString.equals("CLOSE") && isHost(user).equals(",HOST")){
			sendGameDataToClients("CLOSE");
			closeGame();
			return;
		}
		// Wenn nicht Host schliesst, sende PLAYERLEFT
		if(gsonString.equals("CLOSE") && isHost(user).equals(",NOTTHEHOST")) {
			sendGameDataToClients("PLAYERLEFT");
		}
		
		if(spectatorList.contains(user)) {
			return;
		}
		
		if (gsonString.equals("RESTART")&& isHost(user).equals(",NOTTHEHOST")) {
			
			if(gState == GameState.RUNNING) {
				sendGameDataToClients("Cannot restart game once it was started.");
				return;
			}
		}
		
		if (gsonString.equals("RESTART") && isHost(user).equals(",HOST")) {;
		   if(playerList.size() <2) return;
		   if(gState == GameState.RUNNING) 
			{	
			    setGridStatus(new int[85]);
				this.gState= GameState.RUNNING;
				sendGameDataToClients("standardEvent");
				return;
			}
			
		 if(gState !=GameState.RUNNING) {
			 return;
		 }
		 
		 if(user.equals(playerTurn)) {
		 
		 String[] strArray = gsonString.split(",");
			int[] receivedArray = new int[85];
			for (int i = 0; i < 85; i++) {
				receivedArray[i] = Integer.parseInt(strArray[i]);
			}
			int[] gridStatus = getGridStatus();
			boolean changed = false;
			for (int i = 0; i < 85; i++) {
				if (gridStatus[i] !=  receivedArray[i]) {
					changed = true;
				}
			}
			if (changed == true) {
				for (User u : playerList) {
					if (!u.equals(playerTurn)) {
						playerTurn = u;
						break;
					}
			}
				
			setGridStatus(gridStatus);
			
				if ( gameOver()) {
					this.gState = GameState.FINISHED;
				}
				sendGameDataToClients("standardEvent");
			}
		 }
		}
	}
	
	private void setGridStatus(int[] gridStatus) {
		this.gridStatus = gridStatus;
	}
	
	private int[] getGridStatus() {
		return gridStatus;
	}

	@Override
	public ArrayList<User> getPlayerList() {
		// TODO Auto-generated method stub
		return this.playerList;
	}

	@Override
	public ArrayList<User> getSpectatorList() {
		// TODO Auto-generated method stub
		return this.spectatorList;
	}

	@Override
	public String getGameData(String eventName, User user) {
		// TODO Auto-generated method stub
		
		String gameData = "";
		if(eventName.equals("PLAYERLEFT")){
			return playerLeft + " hat das Spiel verlassen!";
		}
		if(eventName.equals("CLOSE")){
			return "CLOSE";
		}
		
//		if(eventName.equals("Restart")){
//			return "Cannot restart game once it was started.";
//		}
//		if(eventName.equals("START")) {
//			return "START";
//		}
//		
//		if(eventName.equals("EndofGame")) {
//			return "EndofGame";
//		}
		
//		if(eventName.equals("standardEvent")) {
//			return "EndofGame";
//		}
		
//		if(eventName.equals("NEW_PLAYER")) {
//			return "NEW_PLAYER" + user.getName();
//		}
		
//		if(eventName.equals("WrongField")) {
//			return "Das Element darf hier nicht platziert werden";
//		}
		
		int[] grid = getGridStatus();

		for (int i = 0; i < 85; i++) {
			gameData += String.valueOf(grid[i]);
			gameData += ',';
		}
		
		if(playerList.size()<2){
			gameData += "Warte Auf 2ten Spieler...";
			gameData += isHost(user);
			return gameData;
		}

		if (this.gState == GameState.FINISHED) {
			if (gameOver()){
				if(grid[40]<grid[81]) {
					gameData += "Player 2 wins!";
				}else if (grid[40]>grid[81]) {
					gameData += "Player 1 wins!";
				}else {
					gameData += "Unentschieden";
				}
				gameData += isHost(user);
				return gameData;
			 }else if (playerTurn.equals(user)) {
		     	gameData += user.getName() +" ist dran!";}

		     }
//		if (playerList.indexOf(user) == 0)
//			gameData += " (x)";
//		else
//			gameData += " (o)";
		
//		gameData += isHost(user);
		return gameData;
		
	}
	
	
	@Override
	public void addUser(User user) {
		// TODO Auto-generated method stub
		if (playerList.size() < 2 && !playerList.contains(user)) {
			playerList.add(user);
			this.gState = GameState.RUNNING;
            playerTurn = playerList.get(0);
            sendGameDataToClients("START");
           
		}else if(playerList.size() >= 2 && !playerList.contains(user)) {
			playerList.add(user);
			sendGameDataToClients("START");
			
				
		}

	}

	@Override
	public void addSpectator(User user) {
		// TODO Auto-generated method stub
		this.spectatorList.add(user);
	}

	@Override
	public boolean isJoinable() {
		if(playerList.size() < 2) {
			return true;
		}else {
		return false;}
	}

	@Override
	public void playerLeft(User user) {
		playerList.remove(user);
		playerLeft = user.getName();
		sendGameDataToClients("PLAYERLEFT");
	}


	@Override
	public GameState getGameState() {
		return this.gState;
	}

	public boolean gameOver() {
		boolean end=false;
		int[] grid = getGridStatus();
		
		// Wenn Orangefarbene und gelbe Zeile voll ist
		for(int i=0; grid[i]!=0 && i<9;i++) {
				for(int j=9; grid[j]!=0 && j<18;j++) {
					if(j==17) {
						end=true;
				}
			
			}
		}
		// Wenn Gelbfarbene und lila Zeile voll ist
		for(int i=0; grid[i]!=0 && i<9;i++) {
			for(int j=18; grid[j]!=0 && j<27;j++) {
				if(j==26) {
				end=true;
				}
			}
		}
		// Wenn Orangefarbene und lila Zeile voll ist
		for(int i=9; grid[i]!=0 && i<18;i++) {
			for(int j=18; grid[j]!=0 && j<27;j++) {
				if(j==26) {
				end=true;
				}
			}
		}

		// Wenn Fehlerwurf Zeile voll ist
		if(grid[31]==4) {					
				end=true;			
		}
		
		
		return end;
	}
	
	private String isHost(User user) {
		if(user==creator) return ",HOST";
		else return ",NOTTHEHOST";
	}

}
