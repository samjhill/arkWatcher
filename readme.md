# arkWatcher
arkWatcher is a RESTful API that provides useful information about your ARK:Survival Evolved Server.


## Install & Run

First, install and set up [ark-server-tools](https://github.com/FezVrasta/ark-server-tools).

```shell
git clone https://github.com/samjhill/arkWatcher.git
node index.js
```

You should see the following:
```shell
listening on port 4730
```
Now, just navigate to http://localhost:4730/status to see if it's working!


## API

### /status

Returns the status of the server.

Sample response:
```json
[["serverRunning","Yes"],
["serverOnline","Yes"],
["serverName","Puesto - (v217.2)"],
["players","0 / 15"],
["serverVersion","799915"],
[""]]
```
I'm not sure why it returns that empty array at the end. This project is still in the early stages of development, so there's bound to be some weirdness.


## License

MIT © [Sam Hill](https://github.com/samjhill)
