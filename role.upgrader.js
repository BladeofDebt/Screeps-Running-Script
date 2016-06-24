var roleUpgrader =
{

    /** @param {Creep} creep **/
    run: function (creep)
    {
        // Checks if the creep is building and has no resources
        if (creep.memory.building && creep.carry.energy == 0)
        {
            creep.memory.building = false;
        }
        // Checks if the creep is not building and has resources
        if (!creep.memory.building && creep.carry.energy == creep.carryCapacity)
        {
            creep.memory.building = true;
        }

        // Checks if the upgrader has no resources
        if (!creep.memory.building)
        {
            // If it has no resources finds the nearest resource point
            var sources = creep.room.find(FIND_SOURCES);

            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(sources[0]);
            }
        }
        else
        {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(creep.room.controller);
            }
        }
    }
};

module.exports = roleUpgrader;