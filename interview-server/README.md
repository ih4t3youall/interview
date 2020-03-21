# Application Setup (Ubuntu)

Here you will find all you need to get this project up and running. Built by [Danny Julian](https://github.com/DanielJulian).

## NodeJS Setup

### Installation
Execute the following commands to install Node LTS version.

```bash
sudo apt-get install curl
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install nodejs
```

### Install Check

```bash
node -v # Should return the installed version
```

### Install Node dependencies
Run the following
```bash
npm install
```

## Database Setup

### Installation
In this proyect we use PostgreSQL11 + PostGIS extension for GIS queries. [Installation Guide](https://computingforgeeks.com/install-postgresql-11-on-ubuntu-18-04-ubuntu-16-04/)

### GIS Support
To install GIS support, we run the following:
```bash
sudo apt install postgresql-11-postgis-2.4
sudo apt-get install postgis
```

Check if its running:
```bash
sudo systemctl status postgresql@11-main
```
If status is Active(exited), then run the following:
```bash
sudo systemctl enable postgresql@11-main
```
If you run the status again, you should see Active(running).

To start/stop postgresql: 
```bash
sudo systemctl start/stop postgresql@11-main
```
A good guide to get started can be found [here](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-16-04).


### Configuration

First, we give the default super user "postgres" a password
```
postgres-# sudo -u postgres psql 
postgres-# \password
postgres-# Password: new password
postgres-# Enter it again: new password
postgres-# \q  <- exit
```

Then we create a new database user/rol, so we dont use the superuser postgres

```bash
user@server:~$ sudo -u postgres createuser --interactive --pwprompt
Enter name of role to add: newUserName
Enter password for new role:
Enter it again:
Shall the new role be a superuser? (y/n) n
Shall the new role be allowed to create databases? (y/n) n
Shall the new role be allowed to create more new roles? (y/n) n
```

The last thing to do, is create a database and grant access to our new user. We will create the database using the postgres user

```java
user@server:~$ sudo -u postgres createdb DatabaseName
user@server:~$ sudo -u postgres psql <- Enter psql CLI
postgres=# \l <- List databases, we should see DatabaseName
```

We give newUserName privileges on the new DatabaseName, and we create the [postgis extension](https://kitcharoenp.github.io/postgresql/postgis/2018/05/28/set_up_postgreSQL_postgis.html) so we can execute GIS queries.

```java
postgres=# grant all privileges on database DatabaseName to newUserName;
postgres-# \c DatabaseName <- Connect to DatabaseName
newUserName=# CREATE EXTENSION postgis;
```

## Environment Variables
The last step in the installation is to configure the environment variables that the system will use.
First, enter the environment variables file
```
user@server:~$ sudo -H vim /etc/environment
```
And add the following lines 
```
NODE_ENV=production
secAppEnvjwtPrivateKey=SomeRandomComplexString
secAppEnvdbUser=YourUserName
secAppEnvdbPw=YourDBPassword
secAppEnvdbDB=YourDatabaseName
```

Once all is setup, run migrations using Sequelize CLI to create the tables in the database         
```
sequelize db:migrate
```

To query the database, go into the server and run the following:
```
sudo -u postgres psql <- Enter PostgreSQL CLI
\c batmandb <- Connect to database "batmandb"
\dt <- List all tables
```
Now you can query. e.g: 
```
SELECT * FROM "Users";
```

To generate [self signed certificates](https://flaviocopes.com/express-https-self-signed-certificate/), run
```
openssl req -nodes -new -x509 -keyout server.key -out server.cert
```

