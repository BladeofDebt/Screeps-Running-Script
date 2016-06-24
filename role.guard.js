/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.guard');
 * mod.thing == 'a thing'; // true
 */

var roleGuard =
{
    run: function (creep)
    {
        if (!Guard(creep))
        {
            creep.moveTo(16, 32);
        }

        //creep.moveTo(16, 32);
    }
};

function Guard(creep)
{
    var hostiles = creep.room.find(FIND_HOSTILE_CREEPS);

    if (hostiles.length > 0)
    {
        if (creep.attack(hostiles[0]) == ERR_NOT_IN_RANGE)
        {
            creep.moveTo(hostiles[0]);
        }

        return true;
    }

    return false;
}

module.exports = roleGuard;