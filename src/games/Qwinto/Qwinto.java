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
	
	private int[] gridStatus = new int[41];
	private User playerTurn = null;
	private ArrayList<User> playerList = new ArrayList<User>();
	private ArrayList<User> spectatorList = new ArrayList<User>();
	private int turnCounter = 0;
	private String playerLeft = null;

	@Override
	public String getSite() {
		// TODO Auto-generated method stub
		try {
			return FileHelper.getFile("Qwinto/Qwinto.html");
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
		return 6;
	}

	@Override
	public int getCurrentPlayerAmount() {
		// TODO Auto-generated method stub
		return playerList.size();
	}

	@Override
	public void execute(User user, String s) {
		// TODO Auto-generated method stub
		if(this.gState==GameState.CLOSED) return;
		if(s.equals("CLOSE")){
			sendGameDataToClients("CLOSE");
			closeGame();
			return;
		}
		
		if (s.equals("RESTART")) {
			if (playerList.size() != 2) return;
			setGridStatus(new int[9]);
			turnCounter = 0;
			this.gState = GameState.RUNNING;
			sendGameDataToClients("standardEvent");
			return;
		}
		if (gState != GameState.RUNNING)
			return;
		if (!user.equals(playerTurn)) {
			return;
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
		return playerList;
	}

	@Override
	public ArrayList<User> getSpectatorList() {
		// TODO Auto-generated method stub
		return spectatorList;
	}

	@Override
	public String getGameData(String eventName, User user) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void addUser(User user) {
		// TODO Auto-generated method stub
		if (playerList.size() < 6 && !playerList.contains(user)) {
			playerList.add(user);

			if (playerTurn == null) {
				playerTurn = user;
			}
			sendGameDataToClients("START");
		}
		if (playerList.size() == 2) {
			this.gState = GameState.RUNNING;
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
		if(playerList.size() < 6) {
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

	public String getGameState(String eventName, User user) {
		// TODO Auto-generated method stub
		String gameData = "";
		if(eventName.equals("PLAYERLEFT")){
			return playerLeft + " hat das Spiel verlassen!";
		}
		if(eventName.equals("CLOSE")){
			return "CLOSE";
		}
		
		int[] grid = getGridStatus();

		for (int i = 0; i < 41; i++) {
			gameData += String.valueOf(grid[i]);
			gameData += ',';
		}
		
		if(playerList.size()<2){
			gameData += "Warte Auf 2ten Spieler...";
			gameData += isHost(user);
			return gameData;
		}

		if (this.gState == GameState.FINISHED) {
			if (turnCounter == 27 && !gameOver()){
				//Punkte auswertung
				gameData += "Unentschieden!";
				gameData += isHost(user);
				return gameData;
			}
			if (playerTurn.equals(user)) {
				gameData += "Du hast verloren!";
			} else
				gameData += "Du hast gewonnen!";
		}else if (playerTurn.equals(user)) {
			gameData += "Du bist dran!";
		} else {
			gameData += playerTurn.getName() + " ist dran!";
		}
		
		gameData += isHost(user);

		return gameData;
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
		for(int i=27; grid[i]!=0 && i<31;i++) {	
				if(i==30) {
				end=true;
				}
			
		}
		
		
		return end;
	}
	
	private String isHost(User user) {
		if(user==creator) return ",HOST";
		else return ",NOTTHEHOST";
	}

}
