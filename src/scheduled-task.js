'use strict';

module.exports = (function() {

  /**
   * Creates a new scheduled task.
   *
   * @param {Task} task - task to schedule.
   * @param {boolean} immediateStart - whether to start the task immediately.
   */
  function ScheduledTask(task, immediateStart) {
    this.task = () => {
      var date = new Date()
      this.tick = setTimeout(this.task, 1000 - date.getMilliseconds());
      task.update(date);
    };

    this.tick = null;

    if (immediateStart !== false) {
      this.start();
    }
  }

  /**
   * Starts updating the task.
   *
   * @returns {ScheduledTask} instance of this task.
   */
  ScheduledTask.prototype.start = function() {
    if (this.task && !this.tick) {
      this.tick = setTimeout(this.task, 1000);
    }

    return this;
  };

  /**
   * Stops updating the task.
   *
   * @returns {ScheduledTask} instance of this task.
   */
  ScheduledTask.prototype.stop = function() {
    if (this.tick) {
      clearTimeout(this.tick);
      this.tick = null;
    }

    return this;
  };

  /**
   * Destoys the scheduled task.
   */
  ScheduledTask.prototype.destroy = function() {
    this.stop();

    this.task = null;
  };

  return ScheduledTask;
}());
