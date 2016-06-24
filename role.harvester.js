var roleHarvester =
{
    /** @param {Creep} creep **/
    run: function (creep)
    {
        // If the creep is not carrying it capacity it gets resource
        if (creep.carry.energy < creep.carryCapacity)
        {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(sources[0]);
            }
        }
        else
        {
            // If it is at maximum capacity it finds a empty storage container
            var targets = creep.room.find(FIND_STRUCTURES,
            {
                filter: (structure) =>
                {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
            });

            // Checks if there is a structure to store the resources in
            if (targets.length > 0)
            {
                // Attempt to place the resources in the structure
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                {
                    // Attempts to move to the structure if it cannot place in the structure
                    creep.moveTo(targets[0]);
                }
            }
            else
            {
                creep.moveTo(12, 25);
            }
        }
    }
};

module.exports = roleHarvester;