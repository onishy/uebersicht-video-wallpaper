tell application "System Events"
    set current_desktop to item 1 of desktops
    set picPath to POSIX file (picture of current_desktop) as string
    set output to picPath
end tell