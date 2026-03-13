# SL Plain App - Personal Productivity Tools

This is my creative solution to not wanting to expose my home server to the public internet and not wanting to use the cloud for a noddy personal project that manages a lot of my life now.

Instead of using the REST APIs. This interacts via email. Instead of having the app send the email which means faffery with secrets etc. This just uses the `mailto` feature. 

My Spring Boot backend then picks up these emails and processes them.

The app is accessed from my phone which saves the plain html to itself so it can be accessed outside of my local network.

This replaces a flutter app, which while cool was a pain to deal with because framework developers are always changing things and making my build break despite no changes from me.