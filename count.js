
const path = require('path');
const fs = require('fs-extra');
const filename = path.resolve(__dirname, 'count.json');
const countConfig =

module.exports = class Count {

    loadCount() {
        return fs.readJSONSync(filename);
    }

    async saveCount(newVal) {
        await fs.writeJSONSync(filename, {total: newVal});

        return this.loadCount();
    }

    async incrementCount() {
        const curCount = await this.loadCount();
        curCount.total += 1;
        await this.saveCount(curCount.total);

        return this.loadCount();
    }
};
