# Proof of Work Sample

This is a simple implementation of the hashcash technique to prevent a user from spamming requests to the server, asking the user a proof of work

The idea is to ask the client to perform a hash operation on a random string increasing the match zero bits each time

You can se more details about the hashcash on [wikipedia](https://en.wikipedia.org/wiki/Hashcash)

You can see this sample running [here](https://master--zealous-easley-71f407.netlify.app/)

For this sample I limit the compare to 20 bits to avoid client browser crash.

## License
[MIT](https://choosealicense.com/licenses/mit/)
