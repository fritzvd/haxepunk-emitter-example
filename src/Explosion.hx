import com.haxepunk.graphics.Emitter;
import com.haxepunk.utils.Ease;
import com.haxepunk.Entity;

class Explosion extends Entity
{
	private var _emitter:Emitter;

	public function new()
	{
		super(x, y);
        _emitter = new Emitter("graphics/particle.png", 4, 4);
        _emitter.newType("explode", [0]);
        _emitter.setMotion("explode",  		// name
		        	0, 				// angle
		        	100, 			// distance
		        	2, 				// duration
		        	360, 			// ? angle range
		        	-40, 			// ? distance range
		        	1, 				// ? Duration range
		        	Ease.quadOut	// ? Easing	
		        	);
        _emitter.setAlpha("explode", 20, 0.1);
        _emitter.setGravity("explode", 5, 1);
        graphic = _emitter;
        layer = -1;
	}

	public function explode(x:Float, y:Float)
	{
		for (i in 0...20)
		{
			_emitter.emit("explode", x, y);
		}
	}


}
