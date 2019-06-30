package games.Qwinto;

import java.util.ArrayList;


public class Network {
	
	private ArrayList<Field> fields;
	private ArrayList<Field> lineColor;
	private ArrayList<Field> square;
	private ArrayList<Field> pentagon;
	private int errors;
	
	public Network() {
		//initiate the lists
		this.fields = new ArrayList<Field>();
		this.lineColor = new ArrayList<Field>();
		this.square = new ArrayList<Field>();
		this.pentagon = new ArrayList<Field>();
		this.errors = 0;
	}
	
	
	public ArrayList<Field> getFields() {
		return fields;
	}


	public int getErrors() {
		return errors;
	}

	public ArrayList<Field> getLineColor() {
		return lineColor;
	}


	public ArrayList<Field> getSquare() {
		return square;
	}


	public ArrayList<Field> getPentagon() {
		return pentagon;
	}

	public void addError() {
		this.errors++;
	}
}
