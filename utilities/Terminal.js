import readline from "readline";
import colours from "./Color.js";
export default class Terminal {

    UPDATE_INDEX;
    #STORAGE = [];
    COLORS = { 
        processing: colours.info, 
        success: colours.success 
    };


    addLine(text, type = 'processing') 
    {
        const index = this.#STORAGE.length + 1;
        this.#STORAGE[index] = {
            text: text,
            type: type,
        };

        console.log(
            this.COLORS[type],
            text.replace(' @space ', this.getMIddleSpace(text.replace(' @space ')))
        );
        return index;
    }

    updateLine(text, type = 'success', INDEX = null) 
    {
        let _index = INDEX ? INDEX : this.#STORAGE.length - 1;
        this.#STORAGE[_index] = {
            text: text,
            type: type,
        };

        let msg = this.COLORS[type].replace(
            '%s',
            text.replace(' @space ', this.getMIddleSpace(text.replace(' @space ')))
        );

        if (INDEX) this.reload();
        else {
            process.stdout.moveCursor(0, -1);
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);
            process.stdout.write(msg);
        }
    }

    readline(msg=false){
        return new Promise((resolve) => {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            });
            rl.question(msg, (answer) => {
                rl.close();
                resolve(answer);
            });
        });
    }

    reload() {
        console.clear();
        Object.values(this.#STORAGE).forEach((node) => {



            

            console.log(
                this.COLORS[node.type],
                node.text.replace(' @space ', this.getMIddleSpace(node.text.replace(' @space ')))
            );


            // console.log(this.COLORS[node.type], (node.text).replace());
        });
    }

    getMIddleSpace(str = null) {
        const terminalWidth = process.stdout.columns || 80;
        const middleSpace = terminalWidth - (str.length + 2);
        return middleSpace > 0 ? ' ' + '-'.repeat(middleSpace) + ' ' : ' ';
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}