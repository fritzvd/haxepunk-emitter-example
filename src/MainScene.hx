import com.haxepunk.Scene;
import Explosion;

class MainScene extends Scene
{
	private var explosion:Explosion;

	public override function begin()
	{
		explosion = new Explosion();
		add(explosion);
	}

	public override function update()
	{
        super.update();
        explosion.explode(30, 40);
	}
}