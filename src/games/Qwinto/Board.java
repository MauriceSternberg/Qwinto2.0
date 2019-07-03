package games.Qwinto;

import java.util.ArrayList;


import userManagement.User;

public class Board {

	private User user;
	private ArrayList<Field> fields;
	
	

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public ArrayList<Field> getFields() {
		return fields;
	}

	public void setFields(ArrayList<Field> fields) {
		this.fields = fields;
	}

	

	public boolean isSquare() {
		return square;
	}

	public void setSquare(boolean square) {
		this.square = square;
	}

	public boolean isPentagon() {
		return pentagon;
	}

	public void setPentagon(boolean pentagon) {
		this.pentagon = pentagon;
	}

	public boolean isCircle() {
		return circle;
	}

	public void setCircle(boolean circle) {
		this.circle = circle;
	}

	private boolean square;
	private boolean pentagon;
	private boolean circle;
	
	/* -- CONSTRUCTOR -- */
	
	public Board(User user) {
	
		this.user = user;

	
		
   }
		
		public void initializeFields()
		{
			//the fields have to be initiated
					this.fields = new ArrayList<Field>();
					//there are 49 elements
					for(int i = 0; i < 41; i++)
            {
						Field field = new Field(i);
						fields.add(field);
					}
		}
		
		/* -- METHODS TO ACCESS NEIGHBOURING FIELDS -- */
				
}