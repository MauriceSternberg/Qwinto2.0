package games.Qwinto;

import java.util.ArrayList;


import userManagement.User;

public class Board {

	private User user;
	private ArrayList<Field> fields;

	private boolean square;
	private boolean pentagon;
	private boolean circle;
	
	/* -- CONSTRUCTOR -- */
	
	public Board(User user) {
	
		this.user = user;
		
		this.fields = new ArrayList<Field>();
		
		for(int i = 0; i <= 41; i++) {
			Field field = new Field(i);
			fields.add(field);
		
}
		
		/* -- METHODS TO ACCESS NEIGHBOURING FIELDS -- */
		
		
		
}
	
}