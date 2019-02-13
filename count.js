const path = require('path');
const fs = require('fs-extra');
const filename = path.resolve(__dirname, 'count.json');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

module.exports = class Count {
    loadCount() {
        return fs.readJSONSync(filename);
    }

    async saveCount(newVal) {
        await fs.writeJSONSync(filename, { total: newVal });

        return this.loadCount();
    }

    async incrementCount() {
        const curCount = await this.loadCount();
        curCount.total += 1;
        await this.saveCount(curCount.total);

        return this.updateDisplay(curCount.total);
    }

    async updateDisplay(countVal) {
        const val = isNaN(countVal) ? 0 : countVal;
        const cmd = `echo -n '${val}' > /tmp/countpipe`;

        return await exec(cmd);
    }
};
