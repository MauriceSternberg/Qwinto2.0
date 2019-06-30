package games.Qwinto;


public class Field {
	
	private int position;
	private Field element;
	private boolean isEmpty;
	

	public Field(int position) {
		// TODO Auto-generated constructor stub
		this.position = position;
		this.element = null;
		this.isEmpty = true;
	}
	
	
	public Field(int position, Field element) {
		this.position = position;
		this.element = element;
		this.isEmpty = false;
	}
	

	/* -- METHODS -- */
	

	public void addElement(Field element) throws IllegalPlayerMoveException {
		if(isEmpty) {
			this.element = element;
			this.isEmpty = false;
		} else {
			throw new IllegalPlayerMoveException("Das Feld ist bereits belegt.");
		}
	}
	

	
	
	/* -- GETTERS -- */

	public int getPosition() {
		return position;
	}
	public Field getElement() {
		return element;
	}

	public boolean isEmpty() {
		return isEmpty;
	}
	
	@Override
	public String toString() {
		String description = "Position: " + this.position + ", Element: ";
		if(isEmpty()) {
			description += "none";
		} else {
			description += this.element.getElement();
		}
		return description;
	}
	
	}


