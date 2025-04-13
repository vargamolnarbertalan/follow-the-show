# Follow The Show by B3RC1
This application helps you to create a show rundown and follow it through the whole the broadcast!

## Running the application
Pull image from GitHub Packages.

## Available pages

- **ip:port** ---> Manager window. This is basically a dashboard where you can create, edit, duplicate and remove segments or even reorder them by entering a new rundown ID.
- **ip:port/follow?ip=${ip}** ---> With this view, all crew members can follow the rundown and see what's coming up next. 

## Using the manager window
### Hotkey
Add a new line of segment: **Shift + Enter**
### Valid time format
Only accepatble time format for start time, end time and duration fields: **HH:mm:ss**

## HTTP API
> GET Requests

- **ip:port/hidenext** ---> Hides the next line of segment on all follow windows. 
- **ip:port/hidereset** ---> Resets all hidden lines of segment to original appearance

### *Please note*
*You can open multiple follow windows, but it is recommended to keep only one manager dashboard open at all times.*
*Hiding a line of segment is a global function across all follow windows.*
*Resetting all lines of segment to original appearance is a global function across all follow windows.*
*If a new follow window client connects, they will only start to see the lines being hide when the operator hides the next segment.*
*Nothing is stored on the server side, so save your work in the manager window and **download** it as a **.json** file. You can **load** it back anytime!*
*Since nothing is stored on the server side, line hiding progress will be reset upon server restart.*

## Requirements
Current stable version of node.js.