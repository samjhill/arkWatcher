# arkWatcher
arkWatcher is a RESTful API that provides useful information about your [ARK:Survival Evolved](http://store.steampowered.com/app/346110/) Server.


## Install & Run

First, install and set up [ark-server-tools](https://github.com/FezVrasta/ark-server-tools). Check to make sure you're ready to go by running `arkmanager status`. 

Once that's all set, it's pretty simple.

```shell
git clone https://github.com/samjhill/arkWatcher.git
node index.js
```

You should see the following:
```shell
listening on port 4730
```
Now, just navigate to http://localhost:4730/status to see if it's working! 
The default username and password is admin:admin, which you should change in data/users.htpasswd.


## API

### /status

Type: GET

Returns the status of the server.

Sample response:
```json
[
  {"serverRunning":"Yes"},
  {"serverOnline":"Yes"},
  {"serverName":"Puesto - (v217.2)"},
  {"players":"0 / 15"},
  {"serverVersion":"799915"}
]
```
### /log

Type: GET

Returns the log from /var/log/arktools/arkserver.log. For now, it is simply broken into pieces by line.

Sample response:
```json
[
"14:43:27: start","/usr/local/bin/arkmanager: line 328: ulimit: open files: cannot modify limit: Operation not permitted",
"[S_API FAIL] SteamAPI_Init() failed; SteamAPI_IsSteamRunning() failed."
]
```

### /checkUpdate

Type: GET

Returns the current version of the server and the latest available version.
Warning: slow. Nothing I can do about it - it needs to log in to SteamCMD and check the status there.

Sample response:
```json
[
  {"currentVersion":"799915"},
  {"availableVersion":"799915"}
]
```

### /start

Type: POST

Starts the server.

Codes:

201: Started successfully

300: Server is already running


### /stop

Type: POST

Stops the server.

Codes:

201: Stopped successfully

300: Server is already stopped


### /command

Type: POST

Runs a remote command. Full list of commands can be found [here](http://steamcommunity.com/sharedfiles/filedetails/?id=454529617&searchtext=admin), though as I'm testing, I'm finding that some commands in the list are invalid. 

Codes:

200: Command run successfully

300: Server returned no response for the given command

Also returns the message from the server running the command, in plain text format.



## Future Work
Add more information in the status command

## License

MIT © [Sam Hill](https://github.com/samjhill)
