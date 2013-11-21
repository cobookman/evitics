/*
 DATA[0]/data = pin 2 
 DATA[1]/clock = pin 3
 
 D[0] = low && D[1] = low    |  No Data
 D[0] = HIGH                 |  0
 D[1] = HIGH                 |  1
 
 http://www.midwestbas.com/store/media/pdf/infinias/customer_wiegand_card_formats.pdf
 Standard corp 1k
 */
/*      CONFIGURATION      */
//RFID Reader
#define beeperPin 12
#define redPin 11 // Red LED
#define greenPin 10 // GREN LED
#define holdPin 9 //Stop the RFID Reader
#define id_start_bit 14 //The starting bit of the buzzcardID
#define id_bit_length 20 //Bit Length of buzzcardID

//RFID Data - Holds
volatile byte RFID_Data[35]; //Have to store raw RFID data as array as its too long to fit in a natural arduino datatype
volatile int RFID_bitsRead = 0; //How many bits have we read so far?
int hold = false;

#include <SPI.h>
#include <boards.h>
#include <ble_shield.h>
#include <services.h> 

void setup()
{
  ble_begin();
  Serial.begin(57600);

  // Attach pin change interrupt service routines from the Wiegand RFID readers
  attachInterrupt(0, dataZero_High, RISING);//DATA0 to pin 2 - data
  attachInterrupt(4, dataOne_High, RISING); //DATA1 to pin 3 - clock
  delay(10);

  //  pinMode(beeperPin, OUTPUT);
  //  digitalWrite(beeperPin, HIGH);
  //  pinMode(redPin, OUTPUT);
  //  digitalWrite(redPin, HIGH);
  //  pinMode(greenPin, OUTPUT);
  //  digitalWrite(greenPin, HIGH);
  //  pinMode(holdPin, OUTPUT);
  //  digitalWrite(holdPin, HIGH);

  // put the reader input variables to zero
  for(int i = 0; i < 35; i++) {
    RFID_Data[i] = 0x00;
  }
  RFID_bitsRead = 0;


}

void loop() {
  while(ble_available()) {
    byte temp = ble_read();
    Serial.print(temp, HEX);
    ble_write(temp);
  }
  if(RFID_bitsRead >= 35) { //HID Corporate 1000 (BuzzCard) uses 35 bits, all RFID data is read at this point
    //Parse out only the data we want
    unsigned long Card_Data = 0; //Interger was having overflow
    for(int i = id_start_bit; i < (id_start_bit + id_bit_length); i++) {
      Card_Data <<= 1;
      Card_Data |= RFID_Data[i] & 0x1; //RFID data stored in first bit
      RFID_Data[i] = 0x00; //RESET RFID DATA
    }
    Serial.print(Card_Data);
    ble_write(0x42);
      //RESET RFID
    RFID_bitsRead = 0;
    RFID_UNLOCK(); //Resume RFID hardware interrupts will resume

    //When not reading rfid data, send/receive data from 2nd arduino
  } 
  else if (RFID_bitsRead == 0) {
    //    Wire.requestFrom(0x2, 6); //Request 6 bytes from device id 0x2
    //Slave doesn't need to send all 6 bytes
    //  while(Wire.available()){
    //  char c = Wire.read();
    ///   Serial.print(c);
    // }
    // delay(500);
  }
  if(!hold) {
   ble_do_events();
  }
}


/*
  HARDWARE INTERRUPTS
 */
void dataZero_High(void) { //Binary0
  RFID_Data[RFID_bitsRead] = 0;
  ++RFID_bitsRead;
  //Put on a hold
  if(!hold) {
    RFID_LOCK();
  }
}

void dataOne_High(void) { //Binary1
  RFID_Data[RFID_bitsRead] = 1;
  ++RFID_bitsRead;
  //Put on a hold
  if(!hold) {
    RFID_LOCK();
  }
}
/* 
 HELPER Functions 
 */
void RFID_LOCK() {
  Serial.println("Hold engaged");
  hold = true;
//  digitalWrite(holdPin, LOW);
//  digitalWrite(greenPin, LOW);
//  digitalWrite(redPin, HIGH);
}

void RFID_UNLOCK() {
  Serial.println("Hold dis-engaged");
  hold = false;
//  digitalWrite(holdPin, HIGH);
//  digitalWrite(redPin, LOW);
//  digitalWrite(greenPin, HIGH);
}

