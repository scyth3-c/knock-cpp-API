EJECUTABLE = $(DIR_BIN)/$(title)
DIR_INC  = ./src/c++/addons/headers
DIR_MAIN = ./src/c++/addons/sources
DIR_OBJ = ./src/c++/temp/$(title)_obj
DIR_BIN = ./src/c++/temp/$(title)_bin

OBJETOS = $(DIR_OBJ)/$(title).o \
		  $(DIR_OBJ)/http.o \
		  $(DIR_OBJ)/veridic.o



CPPFLAGS = -std=$(standar) -lcurl -I$(DIR_INC)  -pthread
COMPILER = g++
BUILD = $(COMPILER) $(OBJETOS)  $(CPPFLAGS) -o $(EJECUTABLE)
DATA_ROUTE = ./src/c++/temp/$(title).txt

ifeq ($(data),1)
	BUILD = $(COMPILER) $(OBJETOS)  $(CPPFLAGS) -o $(EJECUTABLE) < $(DATA_ROUTE) 
endif


$(EJECUTABLE) : $(OBJETOS)
	@mkdir -p $(DIR_BIN)
	@$(BUILD)

$(DIR_OBJ)/%.o : $(DIR_MAIN)/**/%.cpp
	@mkdir -p $(DIR_OBJ)
	@$(COMPILER) -c -MD $(CPPFLAGS) $< -o $@
-include $(DIR_OBJ)/*.d

.PHONY: clean install
clean:
	@rm -r $(DIR_BIN) $(DIR_OBJ)

install:

	apt-get install curl
	apt-get install openssl -y
	apt-get install libcurl4-openssl-dev -y