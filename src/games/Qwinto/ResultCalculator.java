package games.Qwinto;

import java.util.ArrayList;

import games.Qwinto.Board;
import games.Qwinto.Field;
import games.Qwinto.Network;



public class ResultCalculator {
	
	public int calculateResult(Board board) {
		//the result is a score
		int score = 0;
		
		
		ArrayList<Network> networks = findNetworks(board);
		
		for(Network n : networks) {
			//get the error counter
			int errors = n.getErrors();
			//for every error, the player loses a point
			score -= errors;
			
			//find out, how many of the fields have been used
			ArrayList<Field> usedFields = usedFields(networks);
			
			score += usedFields.size();
			
		
		return score;
		}
		

		private ArrayList<Network> findNetworks(Board board) {
			//the result is an ArrayList of networks
			ArrayList<Network> networks = new ArrayList<Network>();
			
			//we have to keep looking until there are no more fields that don't belong to any network
			boolean fieldsLeft = true;
			
			while(fieldsLeft) {
			
				//find a starting point
				Field startingPoint = findStartingPoint(board, networks);
			
				//if the result is null, then there are no more networks to be found
				if(startingPoint == null) {
					fieldsLeft = false;
					continue;
				}
				
				//if it is not null, create a new network and add it to the result
				Network network = new Network();
				networks.add(network);
				
				//then, grow it beginning from the starting point
				growNetwork(board, network, startingPoint);
		
			}

			
			//return the result
			return networks;
		}
	}	
}