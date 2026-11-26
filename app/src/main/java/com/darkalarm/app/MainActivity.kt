package com.darkalarm.app

import android.app.Activity
import android.app.TimePickerDialog
import android.os.Bundle
import android.graphics.Color
import android.view.Gravity
import android.widget.*
import android.content.Intent
import android.provider.Settings
import android.os.Build
import java.util.Calendar

class MainActivity : Activity() {

    private lateinit var root: LinearLayout

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        AlarmScheduler.createChannel(this)
        requestPermissionsIfNeeded()
        renderHome()
    }

    private fun requestPermissionsIfNeeded() {
        if (Build.VERSION.SDK_INT >= 33 &&
            checkSelfPermission(android.Manifest.permission.POST_NOTIFICATIONS)
            != android.content.pm.PackageManager.PERMISSION_GRANTED) {
            requestPermissions(
                arrayOf(android.Manifest.permission.POST_NOTIFICATIONS), 100
            )
        }

        if (Build.VERSION.SDK_INT >= 31 &&
            !getSystemService(android.app.AlarmManager::class.java)
                .canScheduleExactAlarms()) {
            startActivity(Intent(Settings.ACTION_REQUEST_SCHEDULE_EXACT_ALARM))
        }
    }

    private fun renderHome() {
        root = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setPadding(24, 50, 24, 20)
            setBackgroundColor(Color.rgb(9, 9, 15))
        }

        val title = TextView(this).apply {
            text = "DARK ALARM"
            textSize = 28f
            setTextColor(Color.WHITE)
            gravity = Gravity.CENTER
        }
        root.addView(title)

        val subtitle = TextView(this).apply {
            text = "YOUR TIME, YOUR LIFE"
            textSize = 12f
            setTextColor(Color.rgb(149, 123, 255))
            gravity = Gravity.CENTER
            setPadding(0, 8, 0, 25)
        }
        root.addView(subtitle)

        val add = Button(this).apply {
            text = "+ ADD NEW ALARM"
            setOnClickListener { showTimePicker() }
        }
        root.addView(add)

        val scroll = ScrollView(this)
        val list = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
        }
        scroll.addView(list)

        AlarmStore.getAll(this).forEach { alarm ->
            val card = LinearLayout(this).apply {
                orientation = LinearLayout.HORIZONTAL
                gravity = Gravity.CENTER_VERTICAL
                setPadding(12, 18, 8, 18)
                setBackgroundColor(Color.rgb(25, 23, 37))
            }

            val info = LinearLayout(this).apply {
                orientation = LinearLayout.VERTICAL
                setPadding(8, 0, 0, 0)
            }

            val time = TextView(this).apply {
                text = String.format("%02d:%02d", alarm.hour, alarm.minute)
                textSize = 28f
                setTextColor(Color.WHITE)
            }

            val label = TextView(this).apply {
                text = alarm.label + " · " +
                    if (alarm.days.isEmpty()) "Once" else "Repeats"
                textSize = 12f
                setTextColor(Color.LTGRAY)
            }

            info.addView(time)
            info.addView(label)

            val toggle = Switch(this).apply {
                isChecked = alarm.enabled
                setOnCheckedChangeListener { _, checked ->
                    val updated = alarm.copy(enabled = checked)
                    AlarmStore.save(this@MainActivity, updated)
                    AlarmScheduler.schedule(this@MainActivity, updated)
                }
            }

            val delete = Button(this).apply {
                text = "×"
                setOnClickListener {
                    AlarmScheduler.cancel(this@MainActivity, alarm)
                    AlarmStore.delete(this@MainActivity, alarm.id)
                    renderHome()
                }
            }

            card.addView(info, LinearLayout.LayoutParams(0, -2, 1f))
            card.addView(toggle)
            card.addView(delete)

            val params = LinearLayout.LayoutParams(-1, -2)
            params.setMargins(0, 14, 0, 0)
            list.addView(card, params)
        }

        root.addView(scroll, LinearLayout.LayoutParams(-1, 0, 1f))
        setContentView(root)
    }

    private fun showTimePicker() {
        val now = Calendar.getInstance()

        TimePickerDialog(
            this,
            { _, hour, minute ->
                showAlarmDetails(hour, minute)
            },
            now.get(Calendar.HOUR_OF_DAY),
            now.get(Calendar.MINUTE),
            true
        ).show()
    }

    private fun showAlarmDetails(hour: Int, minute: Int) {
        val input = EditText(this).apply {
            hint = "Alarm name"
            setText("Wake Up")
        }

        val dayNames = arrayOf(
            "Sunday", "Monday", "Tuesday", "Wednesday",
            "Thursday", "Friday", "Saturday"
        )
        val selected = BooleanArray(7)

        android.app.AlertDialog.Builder(this)
            .setTitle("Alarm name")
            .setView(input)
            .setMultiChoiceItems(dayNames, selected) { _, which, checked ->
                selected[which] = checked
            }
            .setPositiveButton("SAVE") { _, _ ->
                val days = selected.indices
                    .filter { selected[it] }
                    .map { it + 1 }

                val alarm = AlarmItem(
                    id = System.currentTimeMillis(),
                    hour = hour,
                    minute = minute,
                    label = input.text.toString().ifBlank { "Alarm" },
                    days = days,
                    enabled = true
                )

                AlarmStore.save(this, alarm)
                AlarmScheduler.schedule(this, alarm)
                renderHome()
            }
            .setNegativeButton("CANCEL", null)
            .show()
    }
}
