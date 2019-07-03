package games.Qwinto;

import java.util.ArrayList;


public class Network {
	
	private ArrayList<Field> fields;
	private ArrayList<Field> lineColor;
	private ArrayList<Field> square;
	private ArrayList<Field> pentagon;
	private int fehlW�rfe;
	
	public Network() {
		//initiate the lists
		this.fields = new ArrayList<Field>();
		this.lineColor = new ArrayList<Field>();
		this.square = new ArrayList<Field>();
		this.pentagon = new ArrayList<Field>();
		this.fehlW�rfe = 0;
	}
	
	
	
	public int getFehlW�rfe() {
		return fehlW�rfe;
	}



	public void setFehlW�rfe(int fehlW�rfe) {
		this.fehlW�rfe = fehlW�rfe;
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
	
	public void addFehlW�rfe() {
		this.fehlW�rfe++;
	}

	
}
