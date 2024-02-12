<?php
    require 'vendor/autoload.php';
    $university=$_POST['university'];
    $fakultet=$_POST['fakultet'];
    $textspecialnist='Спеціальність:';
    $textspecializaciya='Спеціалізація:';
    $textosvprog='Освітня програма:';
    $textokr='ОКР:';
    $textduscuplina='Дисципліна:';
    $specialnist=$_POST['specialnist'];
    $specializaciya=$_POST['specializaciya'];
    $osvprog=$_POST['osvprog'];
    $okr=$_POST['okr'];
    $duscuplina=$_POST['duscuplina'];
    $number=$_POST['number'];
    $task=$_POST['task'];
    $protokol=$_POST['protokol'];
    $protokolNumber = $_POST['protokolNumber'];
    $zavkaf=$_POST['zavkaf'];
    $zavkafname=$_POST['zavkafname'];
    $prepod=$_POST['prepod'];
    $prepodname=$_POST['prepodname'];

    $zav=$zavkaf.' '.$zavkafname.' __________';
    $prep=$prepod.' '.$prepodname.' __________';

    if (is_array($number)){
        $countPage=count($number);
    }else{
        $countPage=1;
    }

    $phpWord = new \PhpOffice\PhpWord\PhpWord();
    //<documentSettings>====================================================================================
    $phpWord->setDefaultFontName('Times New Roman');
    $phpWord->setDefaultFontSize(14);
    $properties = $phpWord->getDocInfo();
    $properties->setCreator('BiletSite');
    $properties->setCompany('ShevaCompany');
    $properties->setTitle('myTitle');
    $properties->setDescription('myDescription');
    $properties->setCategory('myCategory');
    $properties->setLastModifiedBy('Sheva');
    $properties->setSubject('dietOfStudents');
    $phpWord->getSettings()->setThemeFontLang( new \PhpOffice\PhpWord\Style\Language(\PhpOffice\PhpWord\Style\Language::UK_UA));
    //</documentSettings>====================================================================================
    //<STYLES>====================================================================================
    //<documentStyles>============================================================================
    $sectionStyle = array(
        'marginTop'=>\PhpOffice\PhpWord\Shared\Converter::pixelToTwip(47.42263125),
        'marginBottom'=>\PhpOffice\PhpWord\Shared\Converter::pixelToTwip(25.41853035),
        'marginLeft'=>\PhpOffice\PhpWord\Shared\Converter::pixelToTwip(113.814315),
        'marginRight'=>\PhpOffice\PhpWord\Shared\Converter::pixelToTwip(56.9071575),
        'alignment'=>'center',

        //Настройки для всего шаблона
    );
    //</documentStyles>============================================================================


    //<blockStyles>====================================================================================
    $universityBlockStyle =  array(
        'size'=>14,
        'bold'=>TRUE
        //стиль блока
    );
    $universityParagraphStyle = array(
        'align'=>'center',
        'spacing'=>0,
        'spaceAfter'=>0
        //стиль параграфа
    );
    $tableBlockStyle=array('size'=>12);
    $tableBlockStyleItalic=array('size'=>12,'italic'=>TRUE);
    $tableParagraphStyle = array(
        'align'=>'left',
        'spacing'=>0,
        'spaceAfter'=>0
    );
    $duscuplinatextBlockStyle=array('size'=>12,'bold'=>TRUE);
    $duscuplinaBlockStyle=array('size'=>12,'bold'=>TRUE,'italic'=>TRUE);
    $styleTable = array('borderColor' => 'ffffff');

    $biletBlockStyel=array(
        'size'=>14,
        'bold'=>TRUE);
    $biletParagraphStyele=array(
        'align'=>'center',
        'spaceAfter'=>120,
        'spaceBefore'=>120,
    );
    $taskBlockStyel=array(
        'size'=>12);
    $taskParagraphStyele=array(
        'align'=>'both',
        'spaceAfter'=>10,
        'spaceBefore'=>10,
    );

    $protokolBlockStyle=array(
        'size'=>12
    );
    //</STYLES>====================================================================================
    //<COUNT>=====================================================================================
    $phpWord->addTableStyle('Colspan Rowspan', $styleTable);
    $section = $phpWord->addSection($sectionStyle);
    //</COUNT>=====================================================================================
    //<header>=====================================================================================

    $header = $section->addHeader();
    $header ->addText($university, $universityBlockStyle,$universityParagraphStyle);
    $header ->addText($fakultet,$universityBlockStyle,$universityParagraphStyle);
    $header ->addText(null);

    $table=$header->addTable('Colspan Rowspan');
    $table->addRow(180);
    $table->addCell(2092)->addText($textspecialnist,$tableBlockStyle,$tableParagraphStyle);
    $table->addCell(7795)->addText($specialnist,$tableBlockStyleItalic,$tableParagraphStyle);
    if (strlen($specializaciya)>3) {
        $table->addRow(180);
        $table->addCell(2092)->addText($textspecializaciya,$tableBlockStyle,$tableParagraphStyle);
        $table->addCell(7795)->addText($specializaciya,$tableBlockStyleItalic,$tableParagraphStyle);
    }
    $table->addRow(180);
    $table->addCell(2092)->addText($textosvprog,$tableBlockStyle,$tableParagraphStyle);
    $table->addCell(7795)->addText($osvprog,$tableBlockStyleItalic,$tableParagraphStyle);
    $table->addRow(180);
    $table->addCell(2092)->addText($textokr,$tableBlockStyle,$tableParagraphStyle);
    $table->addCell(7795)->addText($okr,$tableBlockStyleItalic,$tableParagraphStyle);
    $table->addRow(180);
    $table->addCell(2092);
    $table->addCell(7795);
    $table->addRow(180);
    $table->addCell(2092)->addText($textduscuplina,$duscuplinatextBlockStyle,$tableParagraphStyle);
    $table->addCell(7795)->addText($duscuplina,$duscuplinaBlockStyle,$tableParagraphStyle);
    //</header>=====================================================================================

    //<footer>=====================================================================================
    $footer = $section->addFooter();
    $table = $footer->addTable('Colspan Rowspan');
    $table->addRow(180);
    $table->addCell(4960)->addText($protokol,$protokolBlockStyle);
    $table->addCell();
    $table->addRow(850);
    $table->addCell(4960)->addText($protokolNumber,$protokolBlockStyle);
    $table->addCell();
    $table->addRow(284);
    $table->addCell(4960)->addText($zav,$protokolBlockStyle);
    $table->addCell(4960)->addText($prep,$protokolBlockStyle);
    //</footer>=====================================================================================


    //<content>=====================================================================================
    function Pages($countPage,$number,$task, $section,$biletBlockStyel,$biletParagraphStyele
        ,$taskBlockStyel,$taskParagraphStyele){
        for ($i=0;$i<$countPage;$i++){
            if (is_array($task)||is_array($number)) {
                $section->addText($number[$i],$biletBlockStyel,$biletParagraphStyele);
                for ($j = 0; $j < count($task[$i]); $j++) {

                    $section->addText($task[$i][$j], $taskBlockStyel, $taskParagraphStyele);
                }
            }else{
                $section->addText($number,$biletBlockStyel,$biletParagraphStyele);
                $section->addText($task, $taskBlockStyel, $taskParagraphStyele);
            }
            if ($i<$countPage-1){
                $section->addPageBreak();
            }
            
            
        }
    }
    //</content>=====================================================================================
    Pages($countPage,$number,$task, $section,$biletBlockStyel,$biletParagraphStyele
        ,$taskBlockStyel,$taskParagraphStyele);
    $objWriter = \PhpOffice\PhpWord\IOFactory::createWriter($phpWord,'Word2007');
    $objWriter->save('bilet.docx');

    echo 'backEnd\bilet.docx' ;