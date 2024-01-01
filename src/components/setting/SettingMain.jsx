"use client";
import React from "react";
import toast from "react-hot-toast";

const SettingMain = () => {
  const settingsLocalData = JSON.parse((typeof window !== 'undefined' ? localStorage.getItem("settings") : null));
  const handleSave = (e) => {
    e.preventDefault();
    const form = e.target;

    const check = form.check.checked;
    const focusTime = form.focusTime.value;
    const shortBreak = form.shortBreak.value;
    const longBreak = form.longBreak.value;
    const cycleCount = form.cycleCount.value;

    const settingsData = {
      check: check,
      focusTime: focusTime,
      shortBreak: shortBreak,
      longBreak: longBreak,
      cycleCount: cycleCount,
    };

    localStorage.setItem("settings", JSON.stringify(settingsData));
    toast.success('Save Changes')
  };

  return (
    <div className="main-setting lg:w-[370px] m-auto">
      <h2 className="text-[#FF6900] mb-10 max-md:mb-8 max-lg:text-center">
        Setting
      </h2>
      <form onSubmit={handleSave} className="flex flex-col space-y-5">
        <div className="flex">
          <div className="div">
            <h4>Auto Start</h4>
            <p>
              Automatically start next focus or break after previous one ends.
            </p>
          </div>
          <label className="switch">
            <input type="checkbox" name="check" defaultChecked = {settingsLocalData ? settingsLocalData.check : false} />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="flex">
          <div className="div">
            <h4>Focus (min)</h4>
            <p>Duration of the focus period in minutes</p>
          </div>
          <input
            type="number"
            name="focusTime"
            defaultValue={settingsLocalData ? settingsLocalData.focusTime : '25'}
            className="w-9 h-5 text-right"
          />
        </div>
        <div className="flex">
          <div className="div">
            <h4>Short Break (min)</h4>
            <p>Duration of the short break between pomodoros in minutes</p>
          </div>
          <input
            type="number"
            name="shortBreak"
            defaultValue={settingsLocalData ? settingsLocalData.shortBreak : '5'}
            className="w-9 h-5 text-right"
          />
        </div>
        <div className="flex">
          <div className="div">
            <h4>Long Break</h4>
            <p>Duration of the long break between cycles in minutes</p>
          </div>
          <input
            type="number"
            name="longBreak"
            defaultValue={settingsLocalData ? settingsLocalData.longBreak : '15'}
            className="w-9 h-5 text-right"
          />
        </div>
        <div className="flex">
          <div className="div">
            <h4>Cycle Count</h4>
            <p>Number of cycles to work before long break</p>
          </div>
          <input
            type="number"
            name="cycleCount"
            defaultValue={settingsLocalData ? settingsLocalData.cycleCount : '4'}
            className="w-9 h-5 text-right"
          />
        </div>

        <button type="submit" className="text-white font-semibold">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default SettingMain;
