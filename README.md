# React: Creating and Hosting a Full-Stack Site
## Introduction
Combines React, Node.js, and Amazon Web Services (AWS) in a full-stack, full-featured website, including user-friendly forms for posting articles and comments. React components, develop a Node.js server, tie in a MongoDB database, and deploy on Amazon Web Services.

## Technologies
   - React
   - Express
   - MongoDB
   - AWS

## Configuration

Launch a Linux instance with a public DNS name that is reachable from the Internet and to which you are able to connect using SSH. For more information, see Step 1: Launch an Instance in the Amazon EC2 User Guide for Linux Instances. 
   - See https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html#ec2-launch-instance_linux.
### Create key pair and download .pem file
   1. Add .pem file to C:\\Users\<username>\.ssh (Windows)
   2. File must have read permission
### Connect to your Linux instance as ec2-user using SSH.
   - ```ssh -i <filename>.pem ec2-user@<public-IPV4-DNS>```
### Install git
   - ```sudo yum install git```
### Install Node 
   1. Install Node Version Manager
      - ```curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash```
   2. Activate nvm by typing the following at the command line.
      - ```. ~/.nvm/nvm.sh```
   3. Use nvm to install the latest version of Node.js by typing the following at the command line.
      - ```nvm install node```
   - See https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html
### Install Node Package Manager (NPM)
   - ```npm install -g npm@latest```
### Install MongoDB 
   1. Create a /etc/yum.repos.d/mongodb-org-5.0.repo file so that you can install MongoDB directly using yum
      - ```sudo nano /etc/yum.repos.d/mongodb-org-5.0.repo```
      - ```[mongodb-org-5.0]
         name=MongoDB Repository
         baseurl=https://repo.mongodb.org/yum/amazon/2/mongodb-org/5.0/x86_64/
         gpgcheck=1
         enabled=1
         gpgkey=https://www.mongodb.org/static/pgp/server-5.0.asc
         ```
   2. Install
      - ```sudo yum install -y mongodb-org```
   3. Start service
      - ```sudo service mongod start```
   4. Create database
      - ```mongosh```
      - ```use my-blog```
      - ```mongodb
         db.articles.insert([
           {
             name: 'learn-react',
             upvotes: 4,
             comments: [
               {
                 username: 'Azeez',
                 text: 'I love this article more than uzair'
               },
               { username: 'Uzair', text: 'I love this article' },
               { username: 'Malik', text: 'Interesting' }
             ]
           },
           {
             name: 'learn-node',
             upvotes: 0,
             comments: []
           },
           {
             name: 'my-thoughts-on-resumes',
             upvotes: 8,
             comments: []
           }
         ])
         ```
      - See https://docs.mongodb.com/manual/tutorial/install-mongodb-on-amazon/
### Clone repo
   - `git clone https://github.com/sduzair/Linkedin-Learning-React-Creating-and-Hosting-a-Full-Stack-Site.git`
   - `cd Linkedin-Learning-React-Creating-and-Hosting-a-Full-Stack-Site/`
### Install node modules
   - `npm install`
### Keep server running
   - `npm install -g forever`
   - `forever start -c "npm start" .`
### Mapping to localhost/8000
   - `sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 8000`
### Edit Inbound Rules
   - Under Security Groups > launch-wizard-1 > Edit inbound rules 
      - Add rule of Type: <b>HTTP</b> Source: <b>Anywhere</b>
   - ![This is an image](../blob/main/assets/images/electrocat.png)
## To-do
   - [ ] Add login and logout functionality
   - [ ] Improve error handling
   - [ ] Securing MongoDB
