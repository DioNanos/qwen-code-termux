#!/data/data/com.termux/files/usr/bin/bash
# TERMUX PATCH: Termux-API Tool Discovery for Qwen Code
# Returns FunctionDeclarations for Termux commands
# Author: DioNanos

cat << 'EOF'
[
  {
    "name": "termux_battery_status",
    "description": "Get device battery status including percentage, health, temperature, and charging state. Returns JSON with: health (GOOD/OVERHEAT/DEAD/etc), percentage (0-100), plugged (AC/USB/WIRELESS/UNPLUGGED), status (CHARGING/DISCHARGING/FULL/NOT_CHARGING), temperature (Celsius), current (microamperes).",
    "parametersJsonSchema": {
      "type": "object",
      "properties": {}
    }
  },
  {
    "name": "termux_clipboard_get",
    "description": "Read the current content of the Android clipboard. Returns the clipboard text content to stdout.",
    "parametersJsonSchema": {
      "type": "object",
      "properties": {}
    }
  },
  {
    "name": "termux_clipboard_set",
    "description": "Set the Android clipboard content. The text parameter will be copied to the system clipboard.",
    "parametersJsonSchema": {
      "type": "object",
      "properties": {
        "text": {
          "type": "string",
          "description": "Text to copy to clipboard"
        }
      },
      "required": ["text"]
    }
  },
  {
    "name": "termux_toast",
    "description": "Show a toast notification message on screen. Optional parameters control appearance and duration.",
    "parametersJsonSchema": {
      "type": "object",
      "properties": {
        "message": {
          "type": "string",
          "description": "Message to display in toast"
        },
        "short": {
          "type": "boolean",
          "description": "Use short duration (default: false for long)"
        },
        "gravity": {
          "type": "string",
          "enum": ["top", "middle", "bottom"],
          "description": "Toast position on screen"
        },
        "background_color": {
          "type": "string",
          "description": "Background color (e.g., 'red', '#FF0000')"
        },
        "text_color": {
          "type": "string",
          "description": "Text color (e.g., 'white', '#FFFFFF')"
        }
      },
      "required": ["message"]
    }
  },
  {
    "name": "termux_notification",
    "description": "Create a persistent notification in the Android notification shade. Supports title, content, icons, actions, buttons, LED, sound, and vibration.",
    "parametersJsonSchema": {
      "type": "object",
      "properties": {
        "title": {
          "type": "string",
          "description": "Notification title"
        },
        "content": {
          "type": "string",
          "description": "Notification body text"
        },
        "id": {
          "type": "string",
          "description": "Unique ID to update/remove notification later"
        },
        "priority": {
          "type": "string",
          "enum": ["high", "low", "default"],
          "description": "Notification priority"
        },
        "sound": {
          "type": "boolean",
          "description": "Play notification sound"
        },
        "vibrate": {
          "type": "string",
          "description": "Vibration pattern (e.g., '500,500,500')"
        },
        "ongoing": {
          "type": "boolean",
          "description": "Make notification ongoing (not dismissible)"
        },
        "group": {
          "type": "string",
          "description": "Notification group key"
        }
      },
      "required": []
    }
  },
  {
    "name": "termux_notification_remove",
    "description": "Remove a previously created notification by ID.",
    "parametersJsonSchema": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string",
          "description": "Notification ID to remove"
        }
      },
      "required": ["id"]
    }
  },
  {
    "name": "termux_tts_speak",
    "description": "Speak text aloud using Android text-to-speech engine. Supports language, pitch, and rate parameters.",
    "parametersJsonSchema": {
      "type": "object",
      "properties": {
        "text": {
          "type": "string",
          "description": "Text to speak"
        },
        "language": {
          "type": "string",
          "description": "Language code (e.g., 'en-US', 'it-IT', 'ja-JP')"
        },
        "pitch": {
          "type": "string",
          "description": "Pitch adjustment (e.g., '1.0' for normal)"
        },
        "rate": {
          "type": "string",
          "description": "Speech rate (e.g., '1.0' for normal)"
        }
      },
      "required": ["text"]
    }
  },
  {
    "name": "termux_vibrate",
    "description": "Vibrate the device for specified duration. Can force vibration even if silent mode.",
    "parametersJsonSchema": {
      "type": "object",
      "properties": {
        "duration": {
          "type": "string",
          "description": "Vibration duration in milliseconds (default: 1000)"
        },
        "force": {
          "type": "boolean",
          "description": "Force vibration even in silent mode"
        }
      },
      "required": []
    }
  },
  {
    "name": "termux_torch",
    "description": "Control the camera flash/torch. Turn on, off, or query current state.",
    "parametersJsonSchema": {
      "type": "object",
      "properties": {
        "state": {
          "type": "string",
          "enum": ["on", "off"],
          "description": "Torch state: on or off"
        }
      },
      "required": ["state"]
    }
  },
  {
    "name": "termux_wifi_scan",
    "description": "Scan for WiFi networks and return information about nearby access points.",
    "parametersJsonSchema": {
      "type": "object",
      "properties": {},
      "required": []
    }
  },
  {
    "name": "termux_wifi_connection",
    "description": "Get current WiFi connection information including SSID, BSSID, frequency, and signal strength.",
    "parametersJsonSchema": {
      "type": "object",
      "properties": {},
      "required": []
    }
  },
  {
    "name": "termux_location",
    "description": "Get current device location including latitude, longitude, altitude, accuracy, and bearing.",
    "parametersJsonSchema": {
      "type": "object",
      "properties": {
        "provider": {
          "type": "string",
          "enum": ["gps", "network", "passive"],
          "description": "Location provider (default: gps)"
        }
      },
      "required": []
    }
  },
  {
    "name": "termux_camera_info",
    "description": "Get information about device cameras including IDs, focal lengths, and orientations.",
    "parametersJsonSchema": {
      "type": "object",
      "properties": {},
      "required": []
    }
  },
  {
    "name": "termux_camera_photo",
    "description": "Take a photo with the specified camera. Returns file path to saved image.",
    "parametersJsonSchema": {
      "type": "object",
      "properties": {
        "camera_id": {
          "type": "string",
          "description": "Camera ID (from termux_camera_info)"
        },
        "output_file": {
          "type": "string",
          "description": "Output file path for saved photo"
        }
      },
      "required": ["camera_id"]
    }
  },
  {
    "name": "termux_dialog",
    "description": "Show a dialog with text input. Returns user input or empty if cancelled.",
    "parametersJsonSchema": {
      "type": "object",
      "properties": {
        "title": {
          "type": "string",
          "description": "Dialog title"
        },
        "message": {
          "type": "string",
          "description": "Dialog message/prompt"
        },
        "hint": {
          "type": "string",
          "description": "Input hint text"
        }
      },
      "required": ["title"]
    }
  },
  {
    "name": "termux_share",
    "description": "Share text or file via Android share sheet.",
    "parametersJsonSchema": {
      "type": "object",
      "properties": {
        "text": {
          "type": "string",
          "description": "Text content to share"
        },
        "action": {
          "type": "string",
          "description": "Optional action to handle shared content"
        },
        "title": {
          "type": "string",
          "description": "Title for share sheet"
        }
      },
      "required": []
    }
  },
  {
    "name": "termux_volume",
    "description": "Control device volume levels for different streams.",
    "parametersJsonSchema": {
      "type": "object",
      "properties": {
        "stream": {
          "type": "string",
          "enum": ["alarm", "music", "notification", "ring", "system"],
          "description": "Audio stream to control"
        },
        "volume": {
          "type": "string",
          "description": "Volume level (0-100 or 'mute', 'raise', 'lower')"
        }
      },
      "required": ["stream"]
    }
  },
  {
    "name": "termux_telephony_call",
    "description": "Initiate a phone call to the specified number.",
    "parametersJsonSchema": {
      "type": "object",
      "properties": {
        "number": {
          "type": "string",
          "description": "Phone number to call"
        }
      },
      "required": ["number"]
    }
  },
  {
    "name": "termux_telephony_cellinfo",
    "description": "Get cellular network information including operator, MCC, MNC, and LAC.",
    "parametersJsonSchema": {
      "type": "object",
      "properties": {},
      "required": []
    }
  },
  {
    "name": "termux_fingerprint",
    "description": "Authenticate with fingerprint sensor or check availability.",
    "parametersJsonSchema": {
      "type": "object",
      "properties": {
        "timeout": {
          "type": "string",
          "description": "Timeout in seconds (default: 30)"
        }
      },
      "required": []
    }
  },
  {
    "name": "termux_sensor_info",
    "description": "Get information about available sensors on the device.",
    "parametersJsonSchema": {
      "type": "object",
      "properties": {
        "sensor_type": {
          "type": "string",
          "description": "Filter by sensor type (e.g., 'accelerometer', 'gyroscope')"
        }
      },
      "required": []
    }
  },
  {
    "name": "termux_sensor_read",
    "description": "Read current values from the specified sensor.",
    "parametersJsonSchema": {
      "type": "object",
      "properties": {
        "sensor_name": {
          "type": "string",
          "description": "Sensor name (from termux_sensor_info)"
        },
        "delay": {
          "type": "string",
          "description": "Sampling delay in milliseconds (default: 1000)"
        },
        "limit": {
          "type": "string",
          "description": "Number of readings to return (default: 1, -1 for unlimited)"
        }
      },
      "required": ["sensor_name"]
    }
  }
]
EOF
