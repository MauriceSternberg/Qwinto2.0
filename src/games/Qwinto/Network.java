package games.Qwinto;

import java.util.ArrayList;


public class Network {
	
	private ArrayList<Field> fields;
	private ArrayList<Field> lineColor;
	private ArrayList<Field> square;
	private ArrayList<Field> pentagon;
	private int fehlWuerfe;
	
	public Network() {
		//initiate the lists
		this.fields = new ArrayList<Field>();
		this.lineColor = new ArrayList<Field>();
		this.square = new ArrayList<Field>();
		this.pentagon = new ArrayList<Field>();
		this.fehlWuerfe = 0;
	}
	
	
	
	public int getFehlWuerfe() {
		return fehlWuerfe;
	}



	public void setFehlWuerfe(int fehlWuerfe) {
		this.fehlWuerfe = fehlWuerfe;
	}



	public ArrayList<Field> getFields() {
		return fields;
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
	
	public void addFehlWuerfe() {
		this.fehlWuerfe++;
	}

	
}
