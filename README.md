# brikl-test-automation

To do for Cypress and Robot
1. Run the command:
        npm install
        // Installs all the dependencies for the cypress


2. Run the command:
        pip3 install robotframework
        pip3 install robotframework-selenium2library

        pip3 install robotframework-requests
        pip3 install robotframework-jsonlibrary
        pip3 install robotframework-datadriver

        Install google chrome driver via brew. If you haven’t install brew yet, follow the command below,

            bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install
            /HEAD/install.sh)"

        after install successful, run these commands (don’t forget to change <your_username> to yours),

            echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> /Users
            /<your_username>/.zprofile
            eval "$(/opt/homebrew/bin/brew shellenv)"

        To install google chrome driver, run the command below,

            brew install chromedriver --cask
        
        To ask Mac to verify the google chrome driver binary, run below command in terminal

            xattr -d com.apple.quarantine /opt/homebrew/bin/chromedriver


3. To Open and Run cypress:
            npx cypress open OR npm run cy:open
            npx cypress run OR npm run cy:run

4. To run all of the Robors Intergration test casese
           Robot .