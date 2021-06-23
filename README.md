# GameNight

The goal of GameNight is to help people schedule and plan game nights with their friends. GameNight users can make and join groups with their friends, and choose
and vote on games to play based on games in the group's collection.

## Technologies

React, C#, .NET, SQL Server, SCSS, Firebase, Reactstrap, Material-UI, React-Hook-Form

## ERD

[Link to Project ERD](https://lucid.app/lucidchart/e76f8bc9-6b1d-40f8-aebc-895fa18fb392/edit?shared=true&page=0_0#)

## Wireframe

[Link to Project Wireframe](https://www.figma.com/file/xV3u0gEXtAz3dzqb4tAw5P/GameNight?node-id=0%3A1)

## Project Walkthrough Video

[Link to Video](https://www.loom.com/share/a9c3cbdebaa240b8abac40dbd9d9ab87)

## Details

![Image](https://i.imgur.com/niL4hNs.png)

GameNight is only available to authenticated users, so when a user initially visits the application they will be prompted to log in via Google authentication. Once logged in,
the user will be taken to the home page, which explains how the application works. The user can navigate to their games or their groups, search for a group or log out via
the navbar.

In the My Games section, the user can add, update and remove games from their collection, and view all of the games in their collection. These games will be used in the
Game Night section of the application.

![Image](https://i.imgur.com/VXbLPGE.png)

In the My Groups section, the user can see the groups in which they are an active member, and can create a new group. If the user wishes to join an established group, they can
search for the group in the navbar and request to join the group. The group's admin will then need to approve the user before they can start participating in the group. Active
group members can view and participate in the group's Game Nights, and can leave the group at any time.

![Image](https://i.imgur.com/PyQNN1m.png)

When viewing a specific Game Night, an active group member can add games to the Game Night, and vote on which games they'd like to play on that night. The games that are
available to be added are games from each active group member's collection, barring duplicate titles. The user can filter the game collection to find games based on certain
criteria such as game length, complexity, and number of players.
