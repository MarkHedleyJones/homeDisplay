DOW=$(date +%u)
HOUR=$(date +%H)
MIN=$(date +%M)

# Timer settings
# Mon-Fri
# ON  =  5:15
# OFF =  8:30
# ON  = 15:00
# OFF = 21:00
#
# Sat-Sun
# ON  =  5:30
# OFF = 21:30

#DOW=$1
#HOUR=$2
#MIN=$3

MIN_LATE=$(expr $MIN + 2)
WEEKDAY=1

SHUTDOWN="8:25"


if [ $DOW -lt 6 ] ; then
    # Its a weekday
	if [ $HOUR -lt 8 ] ; then
        # Started before 8am - power cut at 8:30
        SHUTDOWN="8:25"
    elif [ $HOUR -eq 8 ] ; then
        if [ $MIN -lt 25 ] ; then
            # power will be cut at 8:30
            SHUTDOWN="8:25"
        elif [ $MIN -lt 30 ] ; then
            # power will be cut at 8:30
            SHUTDOWN="NOW"
        else
            # power will be cut at 21:00
            SHUTDOWN="20:55"
        fi
    elif [ $HOUR -lt 20 ] ; then
        # power will be cut at 21:00
        SHUTDOWN="20:55"
    elif [ $HOUR -eq 20 ] ; then
        if [ $MIN -lt 55 ] ; then
            # power will be cut at 21:00
            SHUTDOWN="20:55"
        else
            # power will be cut at 21:00
            SHUTDOWN="NOW"
        fi
    else
        # weve missed the 21:00 shutdown, it will be shutdown next tomorrow morning
        if [ $DOW -eq 5 ] ; then
            # tomorrow is saturaday and it wont turn off until 21:30 (tomorrow)
            SHUTDOWN="21:25"
        else
            # tomorrow will still be a weekday so power will be cut at 8:30 (tomorrow)
            SHUTDOWN="08:25"
        fi
	fi
else
    if [ $HOUR -lt 21 ] ; then
        # its a weekend - power cut at 21:30
    	SHUTDOWN="21:25"
    elif [ $HOUR -eq 21 ] ; then
        if [ $MIN -lt 25 ] ; then
            # power will be cut at 21:30
            SHUTDOWN="21:25"
        elif [ $MIN -lt 30 ] ; then
            # power will be cut at 21:30
            SHUTDOWN="NOW"
        else
            # power wont be cut until tomorrow at  21:30
            if [ $DOW -eq 7 ] ; then
                #tomorrow is a Monday so power cut at 8:30
                SHUTDOWN="08:25"
            else
                #tomorrow is a Sunday so power cut at 8:30
                SHUTDOWN="21:25"
            fi
        fi
    else
        if [ $DOW -eq 7 ] ; then
            #tomorrow is a Monday so power cut at 8:30
            SHUTDOWN="08:25"
        else
            SHUTDOWN="21:25"
        fi
    fi
fi
echo "$SHUTDOWN"
at -f /home/pi/shutdown_script.sh $SHUTDOWN
