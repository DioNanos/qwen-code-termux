#!/data/data/com.termux/files/usr/bin/bash
# TERMUX PATCH: Termux-API Tool Call dispatcher for Qwen Code
# Usage: call.sh <tool_name> < params.json
# Author: DioNanos

TOOL_NAME="$1"

# Read JSON params from stdin
PARAMS=$(cat)

case "$TOOL_NAME" in
  termux_battery_status)
    termux-battery-status
    ;;

  termux_clipboard_get)
    termux-clipboard-get
    ;;

  termux_clipboard_set)
    TEXT=$(echo "$PARAMS" | jq -r '.text // empty')
    if [ -n "$TEXT" ]; then
      echo "$TEXT" | termux-clipboard-set
      echo '{"status": "ok"}'
    else
      echo '{"error": "text parameter required"}'
      exit 1
    fi
    ;;

  termux_toast)
    MSG=$(echo "$PARAMS" | jq -r '.message // empty')
    SHORT=$(echo "$PARAMS" | jq -r '.short // false')
    GRAVITY=$(echo "$PARAMS" | jq -r '.gravity // empty')
    BG=$(echo "$PARAMS" | jq -r '.background_color // empty')
    TC=$(echo "$PARAMS" | jq -r '.text_color // empty')

    ARGS=""
    [ "$SHORT" = "true" ] && ARGS="$ARGS -s"
    [ -n "$GRAVITY" ] && ARGS="$ARGS -g $GRAVITY"
    [ -n "$BG" ] && ARGS="$ARGS -c $BG"
    [ -n "$TC" ] && ARGS="$ARGS -C $TC"

    echo "$MSG" | termux-toast $ARGS
    echo '{"status": "ok"}'
    ;;

  termux_notification)
    TITLE=$(echo "$PARAMS" | jq -r '.title // empty')
    CONTENT=$(echo "$PARAMS" | jq -r '.content // empty')
    ID=$(echo "$PARAMS" | jq -r '.id // empty')
    PRIORITY=$(echo "$PARAMS" | jq -r '.priority // empty')
    SOUND=$(echo "$PARAMS" | jq -r '.sound // false')
    VIBRATE=$(echo "$PARAMS" | jq -r '.vibrate // empty')
    ONGOING=$(echo "$PARAMS" | jq -r '.ongoing // false')
    GROUP=$(echo "$PARAMS" | jq -r '.group // empty')

    ARGS="-t \"$TITLE\" -c \"$CONTENT\""
    [ -n "$ID" ] && ARGS="$ARGS --id $ID"
    [ -n "$PRIORITY" ] && ARGS="$ARGS --priority $PRIORITY"
    [ "$SOUND" = "true" ] && ARGS="$ARGS --sound"
    [ -n "$VIBRATE" ] && ARGS="$ARGS --vibrate $VIBRATE"
    [ "$ONGOING" = "true" ] && ARGS="$ARGS --ongoing"
    [ -n "$GROUP" ] && ARGS="$ARGS --group $GROUP"

    eval "termux-notification $ARGS"
    echo '{"status": "ok"}'
    ;;

  termux_notification_remove)
    ID=$(echo "$PARAMS" | jq -r '.id // empty')
    termux-notification-remove --id "$ID"
    echo '{"status": "ok"}'
    ;;

  termux_tts_speak)
    TEXT=$(echo "$PARAMS" | jq -r '.text // empty')
    LANG=$(echo "$PARAMS" | jq -r '.language // empty')
    PITCH=$(echo "$PARAMS" | jq -r '.pitch // empty')
    RATE=$(echo "$PARAMS" | jq -r '.rate // empty')

    ARGS=""
    [ -n "$LANG" ] && ARGS="$ARGS -l $LANG"
    [ -n "$PITCH" ] && ARGS="$ARGS -p $PITCH"
    [ -n "$RATE" ] && ARGS="$ARGS -r $RATE"

    echo "$TEXT" | termux-tts-speak $ARGS
    echo '{"status": "ok"}'
    ;;

  termux_vibrate)
    DUR=$(echo "$PARAMS" | jq -r '.duration // 1000')
    FORCE=$(echo "$PARAMS" | jq -r '.force // false')

    ARGS="-d $DUR"
    [ "$FORCE" = "true" ] && ARGS="$ARGS -f"

    termux-vibrate $ARGS
    echo '{"status": "ok"}'
    ;;

  termux_torch)
    STATE=$(echo "$PARAMS" | jq -r '.state // empty')
    if [ "$STATE" = "on" ]; then
      termux-torch on
      echo '{"status": "torch_on"}'
    elif [ "$STATE" = "off" ]; then
      termux-torch off
      echo '{"status": "torch_off"}'
    else
      termux-torch
      echo '{"status": "ok"}'
    fi
    ;;

  termux_wifi_scan)
    termux-wifi-scan
    ;;

  termux_wifi_connection)
    termux-wifi-connectioninfo
    ;;

  termux_location)
    PROVIDER=$(echo "$PARAMS" | jq -r '.provider // "gps"')
    termux-location -p "$PROVIDER"
    ;;

  termux_camera_info)
    termux-camera-info
    ;;

  termux_camera_photo)
    CAM_ID=$(echo "$PARAMS" | jq -r '.camera_id // "0"')
    OUTPUT=$(echo "$PARAMS" | jq -r '.output_file // empty')
    ARGS="-c $CAM_ID"
    [ -n "$OUTPUT" ] && ARGS="$ARGS $OUTPUT"
    termux-camera-photo $ARGS
    ;;

  termux_dialog)
    TITLE=$(echo "$PARAMS" | jq -r '.title // empty')
    MESSAGE=$(echo "$PARAMS" | jq -r '.message // empty')
    HINT=$(echo "$PARAMS" | jq -r '.hint // empty')
    ARGS="-t \"$TITLE\""
    [ -n "$MESSAGE" ] && ARGS="$ARGS -m \"$MESSAGE\""
    [ -n "$HINT" ] && ARGS="$ARGS -i \"$HINT\""
    termux-dialog $ARGS
    ;;

  termux_share)
    TEXT=$(echo "$PARAMS" | jq -r '.text // empty')
    ACTION=$(echo "$PARAMS" | jq -r '.action // empty')
    TITLE=$(echo "$PARAMS" | jq -r '.title // empty')
    ARGS=""
    [ -n "$TEXT" ] && ARGS="$ARGS -c \"$TEXT\""
    [ -n "$ACTION" ] && ARGS="$ARGS -a \"$ACTION\""
    [ -n "$TITLE" ] && ARGS="$ARGS -t \"$TITLE\""
    eval "termux-share $ARGS"
    echo '{"status": "ok"}'
    ;;

  termux_volume)
    STREAM=$(echo "$PARAMS" | jq -r '.stream // empty')
    VOLUME=$(echo "$PARAMS" | jq -r '.volume // empty')
    termux-volume "$STREAM" "$VOLUME"
    echo '{"status": "ok"}'
    ;;

  termux_telephony_call)
    NUMBER=$(echo "$PARAMS" | jq -r '.number // empty')
    termux-telephony-call "$NUMBER"
    echo '{"status": "ok"}'
    ;;

  termux_telephony_cellinfo)
    termux-telephony-cellinfo
    ;;

  termux_fingerprint)
    TIMEOUT=$(echo "$PARAMS" | jq -r '.timeout // "30"')
    termux-fingerprint -t "$TIMEOUT"
    ;;

  termux_sensor_info)
    SENSOR_TYPE=$(echo "$PARAMS" | jq -r '.sensor_type // empty')
    if [ -n "$SENSOR_TYPE" ]; then
      termux-sensor -l "$SENSOR_TYPE"
    else
      termux-sensor -l
    fi
    ;;

  termux_sensor_read)
    SENSOR=$(echo "$PARAMS" | jq -r '.sensor_name // empty')
    DELAY=$(echo "$PARAMS" | jq -r '.delay // "1000"')
    LIMIT=$(echo "$PARAMS" | jq -r '.limit // "1"')
    ARGS="-s $SENSOR -d $DELAY -n $LIMIT"
    termux-sensor $ARGS
    ;;

  *)
    echo '{"error": "Unknown tool: '"$TOOL_NAME"'"}'
    exit 1
    ;;
esac
