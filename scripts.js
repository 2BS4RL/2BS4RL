(function() {
    const stack = [];
    let index = 0;

    const commands = {
        "clear": function() {
            [...document.body.children].forEach(child => child.remove());
        },
        "ls": function() {
            echo(`passwd.bin\turl.bin`);
        },
        "help": function() {
            echo(`Commands:`);
            echo(`ls: List all files\tcat <filename> [password if need]: Open file content\tclear: Clear screen`)
        },
        "cat": function(file = "", pwd = "") {
            switch (file) {
                case "passwd.bin":
                    echo ("01100011 01100101 01101110 01110100 01101001 01110000 01100101 01100100 01100101");
                break;
                case "url.bin":
                    if (pwd.toLowerCase() === "centipede")
                        echo("https://drive.google.com/file/d/1-sGpmO2A8YbyBZ0wRVAVmmRYjwlM7wUc/view");
                    else
                        echo("Incorrect password");
                break;
                default:
                    echo(`File "${file}" not found`);
                break;
            } 
        }

    };

    function echo(text) {
        const print = document.createElement("input");
        print.classList.add("line");
        print.readOnly = true;
        print.value = text;
        document.body.appendChild(print);
    }

    document.body.onclick = function(e) {
        const collection = document.getElementsByClassName("line");
        collection[collection.length - 1].focus();
    };
    document.body.onkeydown = function(e) {
        const collection = document.getElementsByClassName("line");

        switch (e.key) {
        case "Enter": 
            const input = collection[collection.length - 1].value; 
            
            collection[collection.length - 1].readOnly = true;

            if (Object.keys(commands).includes(input.split(" ")[0])) {
                commands[input.split(" ")[0]](input.split(" ")[1], input.split(" ")[2]);
            } else {
                echo(`Command "${input.split(" ")[0]}" not found`);
            }

            const newLine = document.createElement("input");
            newLine.classList.add("line");
            document.body.appendChild(newLine);
            newLine.focus();

            stack.push(input);
        break;
        case "ArrowUp":
            index--;
            if (index < 0)
                index = 0;
            collection[collection.length - 1].value = stack[index] === undefined ? "" : stack[index]; 
        break;
        case "ArrowDown":
            index++;
            if (index > stack.length)
                index = stack.length - 1;
            collection[collection.length - 1].value = stack[index] === undefined ? "" : stack[index]; 
        break;
        }
        stack.filter(item => item !== undefined);
    };
})();
