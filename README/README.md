<!-- # Bank-tech-test-new-dir

Please clone github repo and follow these steps to be able to run test suit:

# Initialise the NPM project (this will create a file package.json)

$ npm init -y
# Add the jest package to our project
# (this will update package.json and package-lock.json)
$ npm add jest
# (this is so we can run the `jest` command)
$ npm install -g jest
# Run our tests
$ jest -->

<!-- Please be aware: I made an errror when setting up this project and connected my local directory to
the wrong github repo. I made frequent git commits, however this will not be visible
as I created a new repo and copied the files accross from the existing project. -->

<!-- I initially made an object inside the bank class to store transaction info, this later became clear that it would be
neater to have a seperate class and I retrospectively changed the structure. This potentially could've been avoided with better planning.
I initialy had a go at this over the weekend but after having a workshop about code quality, I scrapped that version and pretty much
started again. -->

<!-- This is an app in which a user is able to create a transaction to desposit or withdraw funds from
their bank account. It will then produce a statement reflecting the account's activity.
There is a class for the transaction: transaction.js and the bank account, which takes instances of the transaction class,
and then will produce the statement:
bank.js. Each class has it's own test suit and there is a intergration test to check joint functionality. -->
