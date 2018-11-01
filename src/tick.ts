/**
 * The player chosen an action, for example to walk into a wall.
 * In this tick action everything that follows happens.
 */
export default () => {
  // Do player action consequences.
  resolvePlayerAction();

  // Do enemies AI.
  AI();

  // Increment turn counter

  // Draw.
};

function resolvePlayerAction() {
  /**
   * Collect consequences of the action. For example:
   *    move
   *    take damage by moving into wall
   *    attack/miss/damage an enemy
   */

   /**
    * Resolve consequences.
    */
}

function AI() {

}
