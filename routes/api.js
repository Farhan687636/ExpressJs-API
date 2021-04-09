const favicon = require("serve-favicon");
const express = require("express");
const router = express.Router();
const request = require("request");
const fetch = require("node-fetch");
const dir = process.cwd();

const {
  whois,
  IpLookup
} = require(dir + "/function/lainya");

const {
  igStalk,
  igDownload
} = require(dir + "/function/ig");

const {
  getApk,
  searchApk
} = require(dir + "/function/rexdl");

const {
  artiNama,
  artiMimpi,
  ramalJodoh,
  nomorHoki
} = require(dir + "/function/primbon");

const {
  pShadow,
  pRomantic,
  pSmoke,
  pBurnPapper,
  pNaruto,
  pLoveMsg,
  pMsgGrass,
  pGlitch,
  pDoubleHeart,
  pCoffeCup,
  pLoveText,
  pButterfly
} = require(dir + "/function/photooxy");

const {
  yDonlod,
  yPlay,
  ySearch
} = require(dir + "/function/yt");

const loghandler = {
	notparam: {
		status: false,
		code: 406,
		message: 'masukkan parameter apikey'
		},
		apikeyInvalid: {
			status: false,
			code: 406,
			message: 'Apikey Invalid' 
			},
		text: {
			status: false,
			code: 406,
			message: 'masukkan parameter text' 
			},
		text1 : {
				status: false,
				code: 406,
				message: 'masukkan parameter text1' 
				},
		text2: {
			status: false,
			code: 406,
			message: 'masukkan parameter text2' 
			},
		url: {
			status: false,
			code: 406,
			message: 'masukkan parameter url' 
			},
		query: {
			status: false,
			code: 406,
			message: 'masukkan parameter q' 
			},
		username: {
			status: false,
			code: 406,
			message: 'masukkan parameter username'
			},
		error: {
			status: false,
			code: 406,
			message: 'yahh emror gan:('
			}
	}
		
const listkey = ["Fxc7"];

// add apikey

router.post("/apikey", (req, res) => {
  const key = req.query.key;
  if(listkey.includes(key)) {
    res.send({
      message: 'apikey sudah terdaftar'
    });
  } else {
    listkey.push(key);
    res.send({
      message: 'berhasil mendaftarkan apikey'
    });
  }
});

// delete apikey

router.delete("/apikey", (req, res) => {
	const key = req.query.delete;
	if(listkey.includes(key)) {
		res.send({
			message: 'apikey tidak ada sebelumnya'
			})
			} else {
	listkey.splice(key, 1)
	res.send({
		message: 'apikey berhasil dihapus' 
});
 }
});

router.use(favicon(dir + "/public/favicon.ico"));

/**
 * INDEX (HOME PAGE)
 */

router.get("/", (req, res, next) => {
    res.cookie("rememberme", "1", { 
        expires: new Date(Date.now() + 900000), 
        httpOnly: true 
        });
    res.cookie("some_cross_domain_cookie", "https://fxc7-api.herokuapp.com", { 
        domain: "fxc7-api.herokuapp.com", 
        encode: String 
        });
    res.sendFile(dir + "/public/index.html");
});

// get checked apikey

router.get("/apikey", (req, res) => {
  const key = req.query.key;
  if(listkey.includes(key)) {
    res.send('apikey terdaftar');
  } else {
    res.send('apikey tidak terdaftar');
  }
});

// primbon features

router.get("/primbon/artinama", (req, res) => {
	const apikey = req.query.apikey;
	const nama = req.query.q;
	if(!apikey) return res.send(loghandler.notparam)
	if(!nama) return res.send(loghandler.query)
	if(listkey.includes(apikey)) {
  artiNama(nama)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.send(error);
    });
    } else {
    	res.send(loghandler.apikeyInvalid)
    }
});

router.get("/primbon/artimimpi", (req, res) => {
	const apikey = req.query.apikey;
  const mimpi = req.query.q;
  if(!mimpi) return res.send(loghandler.query)
  if(!apikey) return res.send(loghandler.notparam)
  if(listkey.includes(apikey)){
  artiMimpi(mimpi)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.send(error);
    });
    } else {
    	res.send(loghandler.apikeyInvalid)
    }
});

router.get("/primbon/jodoh", (req, res) => {
  const nama1 = req.query.text1;
  const nama2 = req.query.text2;
  const apikey = req.query.apikey;
  if(!nama1) return res.send(loghandler.text1)
  if(!nama2) return res.send(loghandler.text2)
  if(!apikey) return res.send(loghandler.notparam)
  if(listkey.includes(apikey)){
  ramalJodoh(nama1, nama2)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.send(error);
    });
    } else {
    	res.send(loghandler.apikeyInvalid)
    }
});

router.get("/primbon/nomor-hoki", (req, res) => {
  const nomor = req.query.q;
  const apikey = req.query.apikey;
  if(!nomor) return res.send(loghandler.query)
  if(!apikey) return res.send(loghandler.notparam)
  if(listkey.includes(apikey)){
  nomorHoki(nomor)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.send(error);
    });
    } else {
    	res.send(loghandler.apikeyInvalid)
    }
});
// ======================

// Instagram features

router.get("/ig/stalk", (req, res) => {
  const username = req.query.username;
  const apikey = req.query.apikey;
  if(!username) return res.send(loghandler.username)
  if(!apikey) return res.send(loghandler.apikey)
  if(listkey.includes(apikey)){
  igStalk(username)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
    } else {
    	res.send(loghandler.apikeyInvalid)
    }
});

router.get("/ig/download", (req, res) => {
  const url = req.query.url;
  const apikey = req.query.apikey;
  if(!url) return res.send(loghandler.url)
  if(!apikey) return res.send(loghandler.notparam)
  if(listkey.includes(apikey)){
  igDownload(url)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
    } else {
    	res.send(loghandler.apikeyInvalid)
    }
});
// =========================

// others Features

router.get("/whois", (req, res) => {
  const domain = req.query.q;
  const apikey = req.query.apikey;
  if(!domain) return res.send(loghandler.query)
  if(!apikey) return res.send(loghandler.notparam)
  if(listkey.includes(apikey)){
  whois(domain)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.send(error);
    });
    } else {
    	res.send(loghandler.apikeyInvalid)
    }
});

router.get('/iplookup', (req, res) => {
    const apikey = req.query.apikey;
    const query = req.query.q;
    
    if(!query) return res.send(loghandler.query)
    if(!apikey) return res.send(loghandler.notparam)
    if(listkey.includes(apikey)){
        IpLookup(query)
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.send(err)
            })
            } else {
            	res.send(loghandler.apikeyInvalid)
            }
})

router.get('/tinyurl', (req, res) => {
    const url = req.query.url;
    const apikey = req.query.apikey;

	if(!apikey) return res.send(loghandler.notparam)
	if(!url) return res.send(loghandler.url)
	if(listkey.includes(apikey)) {
     request(`https://tinyurl.com/api-create.php?url=${url}`, function (error, response, body) {
         try {
             res.send({
                 status : true,
                 code: 200,
                 result : `${body}`
             })
         } catch {
             res.send(loghandler.notparam)
         }
     })
     } else {
     	res.send(loghandler.apikeyInvalid)
     }
})
// ==================

// rexdl get apk
router.get("/rexdl/search", (req, res) => {
  const apkname = req.query.q;
  const apikey = req.query.apikey;
  if(!apkname) return res.send(loghandler.query)
  if(!apikey) return res.send(loghandler.notparam)
  if(listkey.includes(apikey)){
  searchApk(apkname)
    .then((data) => {
      res.send({ 
status: true,
code: 200,
data,
});
    })
    .catch((error) => {
      res.send(error);
    });
    } else {
    	res.send(loghandler.apikeyInvalid)
    }
});

router.get("/rexdl/get", (req, res) => {
  const url = req.query.url;
  const apikey = req.query.apikey;
  if(!url) return res.send(loghandler.url)
  if(!apikey) return res.send(loghandler.notparam)
  if(listkey.includes(apikey)){
  getApk(url)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.send(error);
    });
    } else {
    	res.send(loghandler.apikeyInvalid)
    }
});
// ==========================

// photo maker photooxy

router.get("/photooxy/shadow", (req, res) => {
  const text1 = req.query.text;
  const apikey = req.query.apikey;
  if(!text1) return res.send(loghandler.text1)
  if(!apikey) return res.send(loghandler.notparam)
  if(listkey.includes(apikey)){
  pShadow(text1)
    .then((data) => {
      res.send({
status: true,
code: 200,
result: data
})
    })
    .catch((error) => {
      res.send(error)
    });
    } else {
    	res.send(loghandler.apikeyInvalid)
    }
});

router.get("/photooxy/romantic", (req, res) => {
  const text1 = req.query.text;
  const apikey = req.query.apikey;
  if(!text1) return res.send(loghandler.text1)
  if(!apikey) return res.send(loghandler.notparam)
  if(listkey.includes(apikey)){
  pRomantic(text1)
    .then((data) => {
      res.send({
status: true,
code: 200,
result: data
})
    })
    .catch((error) => {
      res.send(error)
    });
    } else {
    	res.send(loghandler.apikeyInvalid)
    }
});

router.get("/photooxy/smoke", (req, res) => {
  const text1 = req.query.text;
  const apikey = req.query.apikey;
  if(!text1) return res.send(loghandler.text1)
  if(!apikey) return res.send(loghandler.notparam)
  if(listkey.includes(apikey)){
  pSmoke(text1)
    .then((data) => {
    res.send({
status: true,
code: 200,
result: data
})
    })
    .catch((error) => {
      res.send(error)
    });
    } else {
    	res.send(loghandler.apikeyInvalid)
    }
});

router.get("/photooxy/burn-papper", (req, res) => {
  const text1 = req.query.text;
  const apikey = req.query.apikey;
  if(!text1) return res.send(loghandler.text1)
  if(!apikey) return res.send(loghandler.notparam)
  if(listkey.includes(apikey)){
  pBurnPapper(text1)
    .then((data) => {
     res.send({
status: true,
code: 200,
result: data
})
    })
    .catch((error) => {
      res.send(error)
    });
    } else {
    	res.send(loghandler.apikeyInvalid)
    }
});

router.get("/photooxy/naruto", (req, res) => {
  const text1 = req.query.text;
  const apikey = req.query.apikey;
  if(!text1) return res.send(loghandler.text1)
  if(!apikey) return res.send(loghandler.notparam)
  if(listkey.includes(apikey)){
  pNaruto(text1)
    .then((data) => {
      res.send({
status: true,
code: 200,
result: data
})
    })
    .catch((error) => {
      res.send(error)
    });
    } else {
    	res.send(loghandler.apikeyInvalid)
    }
});

router.get("/photooxy/love-message", (req, res) => {
  const text1 = req.query.text;
  const apikey = req.query.apikey;
  if(!text1) return res.send(loghandler.text1)
  if(!apikey) return res.send(loghandler.notparam)
  if(listkey.includes(apikey)){
  pLoveMsg(text1)
    .then((data) => {
      res.send({
status: true,
code: 200,
result: data
})
    })
    .catch((error) => {
      res.send(error)
    });
    } else {
    	res.send(loghandler.apikeyInvalid)
    }
});

router.get("/photooxy/message-under-grass", (req, res) => {
  const text1 = req.query.text;
  const apikey = req.query.apikey;
  if(!text1) return res.send(loghandler.text1)
  if(!apikey) return res.send(loghandler.notparam)
  if(listkey.includes(apikey)){
  pMsgGrass(text1)
    .then((data) => {
      res.send({
status: true,
code: 200,
result: data
})
    })
    .catch((error) => {
      res.send(error)
    });
    } else {
    	res.send(loghandler.apikeyInvalid)
    }
});

router.get("/photooxy/glitch", (req, res) => {
  const text1 = req.query.text1;
  const text2 = req.query.text2;
  const apikey = req.query.apikey;
  if(!text1) return res.send(loghandler.text1)
  if(!text2) return res.send(loghandler.text2)
  if(!apikey) return res.send(loghandler.notparam)
  if(listkey.includes(apikey)){
  pGlitch(text1, text2)
    .then((data) => {
      res.send({
status: true,
code: 200,
result: data
})
    })
    .catch((error) => {
      res.send(error)
    });
    } else {
    	res.send(loghandler.apikeyInvalid)
    }
});

router.get("/photooxy/double-heart", (req, res) => {
  const text1 = req.query.text;
  const apikey = req.query.apikey;
  if(!text1) return res.send(loghandler.text1)
  if(!apikey) return res.send(loghandler.notparam)
  if(listkey.includes(apikey)){
  pDoubleHeart(text1)
    .then((data) => {
      res.send({
status: true,
code: 200,
result: data
})
    })
    .catch((error) => {
      res.send(error)
    });
    } else {
    	res.send(loghandler.apikeyInvalid)
    }
});

router.get("/photooxy/coffe-cup", (req, res) => {
  const text1 = req.query.text;
  const apikey = req.query.apikey;
  if(!text1) return res.send(loghandler.text1)
  if(!apikey) return res.send(loghandler.notparam)
  if(listkey.includes(apikey)){
  pCoffeCup(text1)
    .then((data) => {
      res.send({
status: true,
code: 200,
result: data
})
    })
    .catch((error) => {
      res.send(error)
    });
    } else {
    	res.send(loghandler.apikeyInvalid)
    }
});
router.get("/photooxy/love-text", (req, res) => {
  const text1 = req.query.text;
  const apikey = req.query.apikey;
  if(!text1) return res.send(loghandler.text1)
  if(!apikey) return res.send(loghandler.notparam)
  if(listkey.includes(apikey)){
  pLoveText(text1)
    .then((data) => {
      res.send({
status: true,
code: 200,
result: data
})
    })
    .catch((error) => {
      res.send(error)
    });
    } else {
    	res.send(loghandler.apikeyInvalid)
    }
});
router.get("/photooxy/butterfly", (req, res) => {
  const text1 = req.query.text;
  const apikey = req.query.apikey;
  if(!text1) return res.send(loghandler.text1)
  if(!apikey) return res.send(loghandler.notparam)
  if(listkey.includes(apikey)){
  pButterfly(text1)
    .then((data) => {
      res.send({
status: true,
code: 200,
result: data
})
    })
    .catch((error) => {
      res.send(error)
    });
    } else {
    	res.send(loghandler.apikeyInvalid)
    }
});
// ==========================

// Youtube Download

router.get('/yt/download', (req, res) => {
  const url = req.query.url;
  const apikey = req.query.apikey;
  if(!url) return res.send(loghandler.url)
  if(!apikey) return res.send(loghandler.notparam)
  if(listkey.includes(apikey)){
  yDonlod(url)
    .then((data) => {
      res.send(data)
    })
    .catch((error) => {
      res.send(error)
    });
    } else {
    	res.send(loghandler.apikeyInvalid)
    }
});
router.get("/yt/play", (req, res) => {
    const query = req.query.q;
    const apikey = req.query.apikey;
    
    if(!query) return res.send(loghandler.query)
    if(!apikey) return res.send(loghandler.notparam)
    if(listkey.includes(apikey)){
    yPlay(query)
        .then((data) => {
            res.send(data);
        })
        .catch((error) => {
            res.send(error);
        });
      } else {
      res.send(loghandler.apikeyInvalid)
      }
});

router.get("/yt/search", (req, res) => {
    const query = req.query.q;
    const apikey = req.query.apikey;
    
    if(!query) return res.send(loghandler.query)
    if(!apikey) return res.send(loghandler.notparam)
    if(listkey.includes(apikey)){
    ySearch(query)
        .then((data) => {
            res.send(data);
        })
        .catch((error) => {
            res.send(error);
        });
      } else {
     res.send(loghandler.apikeyInvalid)
     }
});
// =====================

// router use if error

router.use(function (req, res, next) {
  res
  .status(404)
  .set("Content-Type", "text/html")
  .sendFile(dir + "/public/404.html");
});

module.exports = router;