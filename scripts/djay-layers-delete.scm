;
; The GIMP -- an image manipulation program
; Copyright (C) 1995 Spencer Kimball and Peter Mattis
;
; Mass delete layers script  for GIMP 2.4
; Created by Daniel Bates
;
; Tags: public domain, layers, delete
;
; Author statement:
;
; Script designed to mass delete layers from current image
; User uses numbers to denote start and end point of deletion
;
; --------------------------------------------------------------------
; Distributed by Gimp FX Foundry project
; --------------------------------------------------------------------
;   - Changelog -
;
; --------------------------------------------------------------------
;
; This script is released into the public domain.
; You may redistribute and/or modify this script or extract segments without prior consent.

; This script is distributed in the hope of being useful
; but without warranty, explicit or otherwise.
;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;


; Define Script

(define (script-fu-delete-select-layers theImage theDraw theRythm)

; Define Variables

(let*
(
    (theNumber 0)
    (theRepeat 0)
    (theLayerRef 0)
    (theLocalRythm 0)
    (theCurrentLayer 0)
 )

; If the end layer is set below the start layer create an error message and terminate
(if (< theRythm 1)
(begin
(set! theLayerRef (car (gimp-message-get-handler)))
(gimp-message-set-handler 0)
(gimp-message "Error: The rythm can't be less than 1")
(gimp-message-set-handler theLayerRef))
(begin

; Begin an undo group
(gimp-image-undo-group-start theImage)

; Get the number of layers in an image and set to a variable
(set! theNumber (car (gimp-image-get-layers theImage)))
; (if (> theRythm theNumber)
; nothing will happen

; Set the local rytm to the rythm
(set! theLocalRythm theRythm)
; Set the repeat the total number of layers
(set! theRepeat theNumber)

; Begin loop and continue while repeat is higher than zero
(while (> theRepeat theRythm)

    ; Set up variable for setting active layers and attributes
    (set! theLayerRef (cadr (gimp-image-get-layers theImage)))

    ; Alter theNumber for use in setting active layers and attributes
;;    (set! theNumber (car (gimp-image-get-layers theImage)))
;;    (set! theNumber (- theNumber (- theLayer1 1)))

    ; Set the layer to be editted as the active layer
    ; (set! theDraw (gimp-image-set-active-layer theImage (aref theLayerRef (- theNumber 1))))

    (set! theLocalRythm (- theLocalRythm 1))

    (if (< theLocalRythm 1)
    (begin
    ; Delete the specified layer
    (gimp-image-remove-layer theImage (aref theLayerRef theCurrentLayer))
    ; Set the local rytm to the rythm
    (set! theLocalRythm theRythm)
    ))

    ; Alter repeat variable ready for checking for next layer, if applicable
    (set! theRepeat (- theRepeat 1))
    (set! theCurrentLayer (+ theCurrentLayer 1))

)

; Update visual display
(gimp-displays-flush)

; End undo group
(gimp-image-undo-group-end theImage)

))
))

; Register script
(script-fu-register     "script-fu-delete-select-layers"
            _"Delete Selected Layers..."
            _"Deletes layers within the specified criteria"
            "d.j.a.y"
            "Daniel Bates"
            "Fev 2016"
            "*"
            SF-IMAGE "SF-IMAGE" 0
            SF-DRAWABLE "SF-DRAWABLE" 0
            SF-ADJUSTMENT _"Each layer" '(1 1 50 1 5 0 1)
)

(script-fu-menu-register "script-fu-delete-select-layers"
                         "<Image>/FX-Foundry/Multi-Layer Tools")
