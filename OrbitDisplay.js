//import celestialBodies from "./components/OrbitSims/OrbitSimDisplay/OrbitSimDisplay";

//START JAVASCRIP

(function () {
  async function __main__() {
    "use strict";
    var version = ["3.2", "glowscript"];
    Array.prototype.toString = function () {
      return __parsearray(this);
    };
    var scene = canvas();

    const colorList = [
      color.blue,
      color.red,
      color.green,
      color.yellow,
      color.purple,
      color.white,
    ];

    const storedData = localStorage.getItem("celestial-bodies");
    let celestialBodies = [];
    if (storedData) {
      celestialBodies = JSON.parse(storedData);
    }

    console.log(celestialBodies);

    let bodies = [];
    for (let i = 0; i < celestialBodies.length; i++) {
      let body = celestialBodies[i];
      let bodySphere = sphere({
        pos: (1000.0)["*"](vec(body.r0[0], body.r0[1], body.r0[2])),
        radius: body.radius["*"](1000.0),
        color: color.blue,
        make_trail: false,
      });
      bodies.push(bodySphere);
    }

    //colorList[Math.floor(Math.random()["*"](colorList.length))]

    const G = 6.67e-11;
    const re = 6371000.0;

    // let b1 = sphere({
    //   pos: vec((16)["-u"]()["*"](re), 0, 0),
    //   radius: re,
    //   color: color.blue,
    //   make_trail: false,
    // });
    // let b2 = sphere({
    //   pos: vec((16)["*"](re), 0, 0),
    //   radius: (1.5)["*"](re),
    //   color: color.white,
    //   make_trail: false,
    // });
    // let b3 = sphere({
    //   pos: vec(0, (16)["*"](re), 0),
    //   radius: (2)["*"](re),
    //   color: color.red,
    //   make_trail: false,
    // });

    // let bodies = [b1, b2, b3];
    // let masses = [5.97e23, 5.97e23, 5.97e23];
    // let v0s = [vec(0.0, 0.0, 0.0), vec(0.0, 0.0, 0.0), vec(0.0, 0.0, 0.0)];

    let focusBody = 0;

    for (let i = 0; i["<"](bodies.length); i++) {
      bodies[i].m = celestialBodies[i].mass;
      bodies[i].v = vec(
        celestialBodies[i].v0[0],
        celestialBodies[i].v0[1],
        celestialBodies[i].v0[2]
      );
      bodies[i].a = vec(0.0, 0.0, 0.0);
      console.log(bodies[i].pos);
    }

    let r = [];
    let rF = [];
    for (let h = 0; h["<"](bodies.length); h++) {
      r.push(bodies[h].pos);
      //bodies[h].pos=bodies[h].pos-bodies[focusBody].pos
    }

    let t = 0;
    let dt = 100.0;
    let collided = [];
    while (true) {
      await rate(100000000000000000);
      for (let d = 0; d["<"](bodies.length); d++) {
        let flag = true;
        bodies[d].a = vec(0.0, 0.0, 0.0);
        for (let n = 0; n["<"](bodies.length); n++) {
          if (n !== d) {
            if (mag(bodies[d].pos["-"](bodies[n].pos))["<"](bodies[d].radius)) {
              bodies[d].radius = bodies[d].radius["**"](3)
                ["+"](bodies[n].radius["**"](3))
                ["**"]((1)["/"](3));
              bodies[n].radius = 0.0;
              bodies[d].v = bodies[d].m["*"](bodies[d].v)
                ["+"](bodies[n].m["*"](bodies[n].v))
                ["/"](bodies[d].m["+"](bodies[n].m));
              bodies[d].m = bodies[d].m["+"](bodies[n].m);
              bodies[n].m = 0.0;
              r.splice(n, 1);
              bodies.splice(n, 1);
              flag = false;
              break;
            }

            bodies[d].a = bodies[d].a["+"](
              G["*"](bodies[n].m)
                ["*"](bodies[n].pos["-"](bodies[d].pos))
                ["/"](mag(bodies[n].pos["-"](bodies[d].pos))["**"](3))
            );
          }
        }
        // if t==1:
        //for g in range(0, len(bodies)):
        // if g != focusBody:
        //bodies[g].make_trail=True
        if (flag === false) {
          break;
        }

        r[d] = r[d]["+"](bodies[d].v["*"](dt)["/"](1000.0));
        bodies[d].pos = r[d];
        bodies[d].v = bodies[d].v["+"](bodies[d].a["*"](dt)["/"](1000.0));
      }

      t = t["+"](1);
    }
  }
  $(function () {
    window.__context = {
      glowscript_container: $("#glowscript").removeAttr("id"),
    };
    __main__();
  });
})();
// END JAVASCRIPT

//--><!]]>
