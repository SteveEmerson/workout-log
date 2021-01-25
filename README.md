# Workout Log Server

## Elevenfifty Academy Web Dev Blue Badge

### Steve Emerson

### Jan 2021

<br><br>

## Endpoints

| Endpoint       | Verb                        | Description                                                                                         |
| :------------- | :-------------------------- | :-------------------------------------------------------------------------------------------------- |
| /user/register | POST                        | Allows a new user to be created with a username and password.                                       |
|                | ![](images/Register.PNG)    |                                                                                                     |
| /user/login    | POST                        | Allows log in with an existing user.                                                                |
|                | ![](images/Login.PNG)       |                                                                                                     |
| /log/          | POST                        | Allows users to create a workout log with descriptions, definitions, results, and owner properties. |
|                | ![](images/LogCreate.PNG)   |                                                                                                     |
| /log/          | GET                         | Gets all logs for an individual user.                                                               |
|                | ![](images/GetUserLogs.PNG) |                                                                                                     |
| /log/:id       | GET                         | Gets individual logs by id for an individual user.                                                  |
|                | ![](images/GetLogById.PNG)  |                                                                                                     |
| /log/:id       | PUT                         | Allows individual logs to be updated by a user.                                                     |
|                | ![](images/UpdateLog.PNG)   |                                                                                                     |
| /log/:id       | DELETE                      | Allows individual logs to be deleted by a user.                                                     |
|                | ![](images/DeleteLog.PNG)   |                                                                                                     |

<br><br>

## Data Models

### **user**

| Property     | Type   |
| :----------- | :----- |
| username     | STRING |
| passwordhash | STRING |

![](images/UserTable.PNG)

<br>

### **log**

| Property    | Type    |
| :---------- | :------ |
| description | STRING  |
| definition  | STRING  |
| result      | STRING  |
| owner_id    | INTEGER |

![](images/LogTable.PNG)
